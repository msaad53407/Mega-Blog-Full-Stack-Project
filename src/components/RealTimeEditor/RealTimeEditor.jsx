import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Loader } from "../";
import configVariables from "../../config/config";
export default function RealTimeEditor({
  name,
  control,
  label,
  defaultValue = "",
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) =>
          !loading ? (
            <Editor
              apiKey={configVariables.VITE_TINYMCE_API_KEY}
              initialValue={defaultValue}
              init={{
                height: 500,
                plugins: [
                  "advlist",
                  "autolink",
                  "link",
                  "image",
                  "lists",
                  "charmap",
                  "preview",
                  "anchor",
                  "pagebreak",
                  "searchreplace",
                  "wordcount",
                  "visualblocks",
                  "visualchars",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "emoticons",
                  "help",
                ],
                toolbar:
                  "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | link image | print preview media fullscreen | " +
                  "forecolor backcolor emoticons | help",
                menu: {
                  favs: {
                    title: "My Favorites",
                    items: "code visualaid | searchreplace | emoticons",
                  },
                },
                menubar: "favs file edit view insert format tools table help",
                content_style:
                  "body {font-family:Helvetica,Arial,sans-serif; font-size:14px}",
              }}
              onEditorChange={onChange}
            />
          ) : (
            <div className="w-full h-64 flex justify-center items-center">
              <Loader className="!w-32 !h-32" />
            </div>
          )
        }
      />
    </div>
  );
}

RealTimeEditor.propTypes = {
  name: PropTypes.string,
  control: PropTypes.object.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
};
