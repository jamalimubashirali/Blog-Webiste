import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, InputField, DropDown, RTE } from "./index.js";
import databaseService from "../appwrite/database.service.js";
import storageService from "../appwrite/storage.service.js";

const PostForm = ({ post }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
      image: post?.featuredImage || "",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    try {
      if (post) {
        // Update existing post
        let fileId = post.featuredImage;

        if (data.image && data.image[0]) {
          // Upload new image and delete old one
          const file = await storageService.uploadFile(data.image[0]);
          if (file) {
            fileId = file.$id;
            await storageService.deleteFile(post.featuredImage);
          }
        }

        const updatedPost = await databaseService.updatePost(post.$id, {
          ...data,
          featuredImage: fileId,
        });

        if (updatedPost) {
          navigate(`/post/${updatedPost.$id}`);
        }
      } else {
        // Create new post
        if (data.image && data.image[0]) {
          const file = await storageService.uploadFile(data.image[0]);
          if (file) {
            const fileId = file.$id;
            data.featuredImage = fileId;
            const newPost = await databaseService.createPost({
              ...data,
              userId: userData.$id,
            });

            if (newPost) {
              navigate(`/post/${newPost.$id}`);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6">
      {/* Title Input */}
      <InputField
        label="Title"
        placeholder="Enter post title"
        {...register("title", { required: "Title is required" })}
        error={errors.title?.message}
      />

      {/* Slug Input */}
      <InputField
        label="Slug"
        placeholder="Enter post slug"
        {...register("slug", { required: "Slug is required" })}
        error={errors.slug?.message}
      />

      {/* Featured Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Featured Image
        </label>
        <input
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image")}
          className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
        {post?.featuredImage && (
          <img
            src={storageService.getPreview(post.featuredImage)}
            alt="Featured"
            className="mt-2 w-32 h-32 object-cover rounded-lg"
          />
        )}
      </div>

      {/* Status Dropdown */}
      <DropDown
        label="Status"
        options={[
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ]}
        {...register("status", { required: "Status is required" })}
        error={errors.status?.message}
      />

      {/* Rich Text Editor (RTE) */}
      <RTE
        label="Content"
        name="content"
        control={control}
        defaultValue={getValues("content")}
      />

      {/* Submit Button */}
      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
        {post ? "Update Post" : "Create Post"}
      </Button>
    </form>
  );
};

export default PostForm;