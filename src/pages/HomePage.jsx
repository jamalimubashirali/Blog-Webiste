import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../components';
import databaseService from '../appwrite/post.service';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(true);

  useEffect(() => {
    (async () => {
      const posts = await databaseService.getDocuments();
      if (posts) {
        setPosts(posts);
        setError(false);
      }
    })();
  }, []); 

  return error ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Container>
        <h1 className="text-2xl font-bold text-red-600">
          An Error Occurred while fetching the Posts
        </h1>
      </Container>
    </div>
  ) : (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-50 py-20">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to the Blog
            </h1>
            <p className="text-lg text-gray-600">
              Explore the latest posts and updates.
            </p>
          </div>
        </Container>
      </section>

      {/* Show all Posts Section */}
      <section className="py-12">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                $id={post.slug}
                title={post.title}
                featuredImage={post.featuredImage}
              />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;