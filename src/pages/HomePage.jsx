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
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center font-bold text-red-600">
          An Error Occurred while fetching the Posts
        </h1>
      </Container>
    </div>
  ) : (
    <div>
      {/* Hero Section with Background Image */}
      <section
        className="relative py-20 sm:py-24 md:py-32 lg:py-48 bg-cover bg-center"
        style={{
          backgroundImage: `url('../src/assets/HomeBg.jpg')`, // Add your image path here
        }}
      >
        {/* Overlay to darken the background image */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <Container>
          <div className="relative z-10 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Welcome to the Blog
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200">
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