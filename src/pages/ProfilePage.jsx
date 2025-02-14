import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "../components/Profile";
import authService from "../appwrite/auth.service";
import { Button, Container, PostCard } from "../components";
import databaseService from "../appwrite/post.service";

const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.userData);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      if (currentUser?._id === userId) {
        setUser(currentUser);
        const posts = await databaseService.getDocuments({
          userId: currentUser?._id,
        });
        if (posts) {
          setPosts(posts);
        }
        setLoading(false);
      } else {
        try {
          const userData = await authService.getCurrentUser(userId);
          if (userData) {
            setUser(userData);
            const posts = await databaseService.getDocuments({ userId });
            if (posts) {
              setPosts(posts);
            }
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [userId, currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Container>
        <Profile
          user={user}
          isEditable={currentUser?._id === userId}
          onEdit={() => navigate(`/edit-profile/${userId}`)}
        />
        {posts == [] ? (
          <>
            <h1 className="text-lg md:text-2xl lg:text-3xl sm:text-xl font-bold my-10">
              Blogs by {user.name}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts?.map((post, index) => {
                return (
                  <PostCard
                    $id={post._id}
                    title={post.title}
                    featuredImage={post.featuredImage}
                    key={index}
                  />
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="text-center my-10">
              <h1>{"Oh! you don't have any blogs. Start Creating one"}</h1>
              <Link to={"/add-post"}>
                <Button
                  bgColor="bg-gray-900"
                  className="hover:bg-gray-300 hover:text-gray-900 mt-5"
                >
                  Start Writing
                </Button>
              </Link>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default ProfilePage;
