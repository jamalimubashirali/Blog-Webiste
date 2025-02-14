import React from "react";
import UserAvatar from "./Avatar";

const Profile = ({ user, isEditable = false, onEdit }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center space-x-6">
        <UserAvatar user={user} size="large" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">About Me</h2>
        <p className="text-gray-600 mt-2">{user?.bio || "No bio available."}</p>
      </div>
      {isEditable && (
        <div className="mt-6">
          <button
            onClick={onEdit}
            className="bg-gray-900 hover:bg-gray-300 hover:text-gray-900 cursor-pointer text-white px-4 py-2 rounded-md"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
