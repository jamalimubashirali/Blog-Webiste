import React, { useState } from 'react';
import UserAvatar from './Avatar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice'; 

const UserDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/'); 
  };

  const handleProfile = () => {
    navigate(`/profile/${user._id}`); 
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
    >
      {/* User Avatar */}
      <div className="cursor-pointer">
        <UserAvatar user={user} size="medium" />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
        onMouseLeave={() => setIsOpen(false)}
        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="py-1">
            {/* Go to Profile Option */}
            <div
              onClick={handleProfile}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Go to Profile
            </div>

            {/* Logout Option */}
            <div
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;