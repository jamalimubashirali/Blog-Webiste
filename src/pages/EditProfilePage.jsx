import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, InputField } from "../components";
import authService from "../appwrite/auth.service";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData) {
      setValue("name", userData.name);
      setValue("email", userData.email);
      setValue("bio", userData.bio);
      setValue("profilePicture", userData.profilePicture);
    }
  }, [userId, setValue]);

  const onSubmit = async (data) => {
    try {
      const updatedUser = await authService.updateUser(userId, data);
      if (updatedUser) {
        navigate(`/profile/${userId}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h1>
        <InputField
          label="Name"
          placeholder="Enter your name"
          {...register("name", { required: "Name is required" })}
        />
        <InputField
          label="Email"
          placeholder="Enter your email"
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        <InputField
          label="Bio"
          placeholder="Tell us about yourself"
          {...register("bio")}
          multiline
        />
        <InputField
          label="Profile Picture URL"
          placeholder="Enter profile picture URL"
          {...register("profilePicture")}
        />
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
