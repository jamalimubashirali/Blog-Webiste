import React from "react";
import { Container, PostForm } from "../components";
import { useLocation } from "react-router-dom";

const EditPostPage = () => {
  const location = useLocation();
  const { post } = location.state;
  return (
    <div>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
};

export default EditPostPage;
