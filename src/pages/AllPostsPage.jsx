import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import databaseService from "../appwrite/database.service";

const AllPostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const posts = await databaseService.getDocuments([]);
      if (posts) {
        setPosts(posts.documents);
      }
    })();
  }, []);
  return posts ? (
    <div>
      <Container>
        <div className="flex flex-wrap">
          {posts?.map((post, index) => {
            <PostCard
              $id={post.$id}
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
