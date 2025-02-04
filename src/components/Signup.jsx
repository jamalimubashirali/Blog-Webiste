import authService from "../appwrite/auth.service";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, InputField, Logo } from "./index.js";
import { useState } from "react";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const createUser = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
          Sign Up to Get Started
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit(createUser)} className="space-y-4">
          <InputField
            label="Name"
            placeholder="Enter your name"
            type="text"
            {...register("name", { required: true })}
            className="w-full"
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Please enter a valid email address",
              },
            })}
            className="w-full"
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            type="password"
            {...register("password", { required: true })}
            className="w-full"
          />
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create Account
          </Button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
