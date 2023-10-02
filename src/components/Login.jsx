import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/appwrite";
import { login as authLogin } from "../features";
import { Button, Input, Logo, Loader } from "./";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { capitalize } from "../utils/utils";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register } = useForm();

  const login = async (data) => {
    setLoading(true);
    setError("");
    try {
      const session = await authService.login(data);
      console.log(session);
      if (session.status) {
        const userData = await authService.getCurrentUser();
        console.log(userData);
        if (userData) {
          console.log(userData);
          dispatch(authLogin(userData));
          navigate("/");
        }
      } else {
        setError(
          capitalize(session.data) !== ""
            ? capitalize(session.data)
            : session.data
        );
        // setTimeout(() => {
        //   setError("");
        // }, 3000);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center max-xl:w-full w-screen p-8">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && (
          <div className="relative">
            <p className="text-red-600 mt-8 text-center break-words">{error}</p>
            <Button
              onClick={() => setError("")}
              className="absolute -top-3 -right-3 !w-max !h-max text-sm !p-1 !px-2  !rounded-full"
            >
              X
            </Button>
          </div>
        )}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    setError("Email address must be a valid address"),
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
                validate: {
                  minLength: (value) =>
                    value.length >= 8 ||
                    setError("Password must be at least 8 characters"),
                },
              })}
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full !text-black bg-transparent rounded-xl border-2 py-4"
            >
              {!loading ? (
                "Sign in"
              ) : (
                <div className="flex gap-3 items-center justify-center">
                  <Loader className="!w-4 !h-4" />
                  {"Signing in"}
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
