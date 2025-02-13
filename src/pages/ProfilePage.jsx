import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "../components/Profile";
import authService from "../appwrite/auth.service";

const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.userData);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser?._id === userId) {
      setUser(currentUser);
      setLoading(false);
    } else {
      const fetchUser = async () => {
        try {
          const userData = await authService.getCurrentUser(userId);
          if (userData) {
            setUser(userData);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [userId, currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Profile
        user={user}
        isEditable={currentUser?._id === userId}
        onEdit={() => navigate(`/edit-profile/${userId}`)}
      />
    </div>
  );
};

export default ProfilePage;
