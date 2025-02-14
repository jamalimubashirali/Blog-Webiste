import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import databaseService from "../appwrite/post.service";

const AllPostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const posts = await databaseService.getDocuments();
      if (posts) {
        setPosts(posts);
      }
    })();
  }, []);
  return posts ? (
    <div>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post, index) => {
             return <PostCard
              $id={post._id}
              title={post.title}
              featuredImage={post.featuredImage}
              key={index}
            />;
          })}
        </div>
      </Container>
    </div>
  ) : (
    <div>
      <Container>
        <h1>Post Not found</h1>
      </Container>
    </div>
  );
};

export default AllPostsPage;
