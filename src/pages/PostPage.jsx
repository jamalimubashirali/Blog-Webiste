import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import databaseService from "../appwrite/post.service";
import { Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const PostPage = ({ user }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [error, setError] = useState(true);

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    (async () => {
      const postData = await databaseService.getPost(slug);
      if (postData) {
        setPost(postData);
        setError(false);
      }
    })();
  }, [slug]);

  const isAuthor = userData?._id === post?.userId; 

  // Handle Edit Post
  const handleEdit = () => {
    navigate(`/edit-post/${post.slug}` , {state : {post : post}});
  };

  // Handle Delete Post
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      const response = await databaseService.deletePost(post.slug);
      if(response){
        navigate("/"); // Redirect to home after deletion
      }
    }
  };

  return error ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Container>
        <h1 className="text-2xl font-bold text-red-600">
          An Error Occurred While Fetching the Post
        </h1>
      </Container>
    </div>
  ) : (
    <div>
      {/* Hero Section with Featured Image */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={post.featuredImage || "https://via.placeholder.com/1200x400"}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-80 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="py-12">
        <Container>
          <div className="prose prose-lg max-w-4xl mx-auto">
            <p className="text-gray-700">{parse(post.content)}</p>
          </div>

          {/* Show buttons only if user is the author */}
          {isAuthor && (
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default PostPage;
