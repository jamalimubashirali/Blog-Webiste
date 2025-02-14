import React from "react";

const UserAvatar = ({ user, size = "medium" }) => {
  const sizes = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-34 h-34",
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div
      className={`${sizes[size]} rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold`}
    >
      {user?.profilePicture ? (
        <img
          src={user.profilePicture}
          alt={user.name}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span>{getInitials(user?.name || "U")}</span>
      )}
    </div>
  );
};

export default UserAvatar;
