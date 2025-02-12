import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, InputField, DropDown, RTE } from "./index.js";
import databaseService from "../appwrite/post.service.js";

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
        const updatedPost = await databaseService.updatePost(post.slug, {
          ...data,
          featuredImage: data.image[0],
        });

        if (updatedPost) {
          navigate(`/post/${updatedPost.$id}`);
        }
      } else {
        
        if (data.featuredImage && data.featuredImage[0]) {
          const newPost = await databaseService.createPost({
            title : data.title,
            content : data.content || "Content not found",
            slug : data.slug,
            featuredImage : data.featuredImage[0]
          });
          if (newPost) {
            navigate(`/posts/${newPost.slug}`);
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
      {/* Two-Column Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
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

          {/* Status Dropdown */}
          <DropDown
            label="Status"
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "draft" },
            ]}
            {...register("status", { required: "Status is required" })}
            error={errors.status?.message}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Featured Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Featured Image
            </label>
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("featuredImage")}
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
            {post?.featuredImage && (
              <img
                src={post.featuredImage}
                alt="Featured"
                className="mt-2 w-32 h-32 object-cover rounded-lg"
              />
            )}
          </div>
        </div>
      </div>

      <div>
        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="flex justify-center">
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
