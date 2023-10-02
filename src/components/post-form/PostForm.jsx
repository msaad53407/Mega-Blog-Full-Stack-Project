import PropTypes from "prop-types";
import { RealTimeEditor, Button, Input, Select, Loader } from "../";
import { useForm } from "react-hook-form";
import {
  storageConfigService,
  dataBaseConfigService,
} from "../../services/appwrite";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPost, updatePost } from "../../features";

const PostForm = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const slugTransform = useCallback((title) => {
    return title
      ?.toLowerCase()
      ?.trim()
      ?.replace(/\s+/g, "-")
      ?.replace(/[^\w-]+/g, "");
  }, []);

  const { register, handleSubmit, watch, getValues, control, setValue } =
    useForm({
      defaultValues: {
        title: post?.title,
        slug: slugTransform(post?.title),
        content: post?.content,
        status: post?.status || "published",
      },
    });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.authReducer.userData);

  const submit = async (data) => {
    setLoading(true);
    if (post) {
      const file = data.image[0]
        ? await storageConfigService.uploadFile(data.image[0])
        : null;
      if (file) {
        await storageConfigService.deleteFile(post.featuredImage);
      }
      const dbPost = await dataBaseConfigService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.featuredImage,
      });
      dispatch(updatePost({ id: post.$id, data: dbPost }));
      if (dbPost) {
        setLoading(false);
        navigate(`/post/${post.$id}`);
      }
    } else {
      const file = await storageConfigService.uploadFile(data.image[0]);
      if (file) {
        const newPost = await dataBaseConfigService.createPost({
          ...data,
          featuredImage: file.$id,
          userId: userData.$id,
        });
        dispatch(addPost(newPost));
        if (newPost) {
          setLoading(false);
          navigate(`/post/${newPost.$id}`);
        }
      }
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex max-sm:flex-col justify-center flex-row flex-wrap"
    >
      <div className="max-sm:w-full w-[63%] px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          readOnly
          // onInput={(e) => {
          //   setValue("slug", slugTransform(e.currentTarget.value), {
          //     shouldValidate: true,
          //   });
          // }}
        />
        <RealTimeEditor
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="max-sm:w-full w-[32%] px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={storageConfigService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={[
            { value: "published", label: "Published" },
            { value: "draft", label: "Draft" },
          ]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          disabled={loading}
          type="submit"
          className={`!w-full flex items-center gap-4 justify-center ${
            post
              ? loading
                ? "!bg-green-300"
                : "!bg-green-500"
              : loading
              ? "!bg-blue-300"
              : "!bg-blue-500"
          }`}
        >
          {!loading ? (
            post ? (
              "Update"
            ) : (
              "Submit"
            )
          ) : (
            <>
              <Loader className="!w-4 !h-4 !border-t-white" />{" "}
              {post ? "Updating" : "Submitting"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

PostForm.propTypes = {
  post: PropTypes.object,
};

export default PostForm;
