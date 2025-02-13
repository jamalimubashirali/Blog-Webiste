import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Profile from '../components/Profile';
import databaseService from '../appwrite/user.service';

const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.userData); // Current logged-in user
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await databaseService.getUser(userId);
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const isEditable = currentUser?._id === userId; // Check if the current user is viewing their own profile

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
        isEditable={isEditable}
        onEdit={() => navigate(`/edit-profile/${userId}`)} // Navigate to edit profile page
      />
    </div>
  );
};

export default ProfilePage;