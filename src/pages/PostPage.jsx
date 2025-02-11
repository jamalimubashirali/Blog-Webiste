import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import databaseService from '../appwrite/post.service';
import { Container } from '../components';

const PostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState({});
  const [error, setError] = useState(true);

  useEffect(() => {
    (async () => {
      const postData = await databaseService.getPost(slug);
      if (postData) {
        setPost(postData);
        setError(false);
      }
    })();
  }, [slug]); // Add `slug` to dependency array to refetch when slug changes

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
            <p className="text-gray-700">{post.content}</p>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default PostPage;