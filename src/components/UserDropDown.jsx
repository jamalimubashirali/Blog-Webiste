import React, { useState } from "react";
import UserAvatar from "./Avatar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import authService from "../appwrite/auth.service";

const UserDropdown = ({ user, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const response = await authService.logout();
    if (response) {
      dispatch(logout());
      navigate("/");
    }
  };

  const handleProfile = () => {
    const userId = user._id;
    navigate(`/profile/${userId}`);
  };

  return (
    <div
      className="relative"
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(true);
      }}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="cursor-pointer">
        <UserAvatar user={user} size="medium" />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="py-1">
            <div
              onClick={handleProfile}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Go to Profile
            </div>

            {options.map((option, index) => (
              <div
                onClick={() => navigate(`${option.slug}`)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer md:hidden"
              >
                {option.name}
              </div>
            ))}
            <div
              onClick={() => {
                navigate("/add-post");
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Add Blog Post
            </div>
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
