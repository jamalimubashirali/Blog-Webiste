import React from "react";
import { Container, Logo, CirclularAvatar, Button } from "./index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: "Blogs",
      slug: "/blogs",
    },
    {
      name: "About",
      slug: "/about",
    },
  ];

  return (
    <header className="bg-white shadow-md">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo Section */}
          <div>
            <Link to={"/"}>
              <Logo width="70px" />
            </Link>
          </div>

          {/* Navigation Links (Visible only when authenticated) */}
          {authStatus && (
            <ul className="flex space-x-6">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  onClick={() => navigate(item.slug)}
                  className="cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-300"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}

          {/* Right Section (Avatar or Buttons) */}
          <div className="flex items-center space-x-4">
            {authStatus ? (
              <CirclularAvatar />
            ) : (
              <>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Log In
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Get Started
                </Button>
              </>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
