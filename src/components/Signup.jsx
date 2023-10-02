import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/appwrite";
import { login } from "../features";
import { Button, Input, Loader, Logo } from "./";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { capitalize } from "../utils/utils.js";
// import PropTypes from "prop-types";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register } = useForm();

  const signup = async (data) => {
    setLoading(true);
    setError("");
    try {
      const session = await authService.addAccount(data);
      if (session.status) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      } else {
        setError(
          capitalize(session.data) !== ""
            ? capitalize(session.data)
            : session.data
        );
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center p-8 justify-center max-xl:w-full w-screen">
      <d
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign Up
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Login
          </Link>
        </p>
        {error && (
          <div className="relative">
            <p className="text-red-600 mt-8 text-center break-words">{error}</p>
            <Button
              onClick={() => setError("")}
              className="absolute -top-4 -right-5 !w-max !h-max text-sm !p-1 !px-2  !rounded-full"
            >
              X
            </Button>
          </div>
        )}
        <form onSubmit={handleSubmit(signup)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Name: "
              placeholder="Enter your name"
              type="text"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
                      ? setError("")
                      : setError("Email address must be a valid address"),
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
                    value.length >= 8
                      ? setError("")
                      : setError("Password must be at least 8 characters"),
                },
              })}
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full !text-black bg-transparent rounded-xl border-2 py-4"
            >
              {!loading ? (
                "Sign Up"
              ) : (
                <div className="flex gap-3 items-center justify-center">
                  <Loader className="!w-4 !h-4" />
                  {"Signing Up"}
                </div>
              )}
            </Button>
          </div>
        </form>
      </d>
    </div>
  );
};

Signup.propTypes = {};

export default Signup;
