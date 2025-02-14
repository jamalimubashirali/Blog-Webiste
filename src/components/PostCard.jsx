import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./index.js";

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      <div className="relative h-48 w-full">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={featuredImage}
          alt={title}
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2 text-gray-800">{title}</h2>
        <Link to={`/posts/${$id}`}>
          <Button
            bgColor="bg-gray-900"
            hoverBgColor="hover:bg-gray-300"
            className="hover:text-gray-900 mt-3"
            rounded="rounded-md"
          >
            Read Blog
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
