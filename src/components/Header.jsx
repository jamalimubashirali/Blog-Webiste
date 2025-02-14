import React from "react";
import { Container, Logo, Button } from "./index";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import UserDropdown from "./UserDropDown";

const Header = () => {
  const authStatus = useSelector(state => state.auth.status);
  const userData = useSelector(state => state.auth.userData);

  const navItems = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: "Blogs",
      slug: "/all-posts",
    },
  ];

  return (
    <header className="bg-white shadow-md top-0 sticky z-50">
      <Container>
        <nav className="flex flex-col md:flex-row items-center justify-between md:px-0 md:space-y-0">
          {/* Logo Section */}
          <div className="w-full md:w-auto flex justify-between items-center">
            <Link to={"/"}>
              <Logo width="70px" />
            </Link>
            
            {/* Mobile-only buttons */}
            {!authStatus && (
              <div className="flex items-center space-x-2 md:hidden">
                <Link to={'/login'}>
                  <Button className="bg-gray-900 text-white text-sm px-3 py-1">
                    Log In
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Navigation Links (Visible only when authenticated) */}
          {authStatus && (
            <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 w-full md:w-auto">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.slug}
                  className={({ isActive }) =>
                    `cursor-pointer text-gray-700 hover:text-blue-600 transition-colors duration-300 ${
                      isActive ? "text-blue-600 font-bold" : ""
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </ul>
          )}

          {/* Right Section (Avatar or Buttons) */}
          <div className="flex items-center space-x-4 w-full md:w-auto justify-center md:justify-end">
            {authStatus ? (
              <UserDropdown user={userData}/>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link to={'/login'}>
                  <Button className="bg-gray-900 hover:bg-gray-300 hover:text-gray-900 text-white cursor-pointer">
                    Log In
                  </Button>
                </Link>
                <Link to={'/signup'}>
                  <Button className="bg-gray-900 hover:bg-gray-300 hover:text-gray-900 text-white cursor-pointer">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;