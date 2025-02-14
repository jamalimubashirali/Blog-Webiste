import React from "react";
import { Container, Logo, Button } from "./index";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import UserDropdown from "./UserDropDown";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

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
        <nav className="flex items-center justify-between py-1">
          <div className="flex-1">
            <Link to={"/"}>
              <Logo width="70px" />
            </Link>
          </div>

          {authStatus && (
            <div className="hidden md:flex flex-1 justify-center">
              <ul className="flex items-center space-x-6">
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
            </div>
          )}

          <div className="flex items-center flex-1 justify-end">
            {authStatus ? (
              <UserDropdown user={userData} options={navItems} />
            ) : (
              <>
                <div className="md:hidden">
                  <Link to={"/login"}>
                    <Button className="bg-gray-900 text-white text-sm px-3 py-1">
                      Log In
                    </Button>
                  </Link>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                  <Link to={"/login"}>
                    <Button className="bg-gray-900 hover:bg-gray-300 hover:text-gray-900 text-white cursor-pointer">
                      Log In
                    </Button>
                  </Link>
                  <Link to={"/signup"}>
                    <Button className="bg-gray-900 hover:bg-gray-300 hover:text-gray-900 text-white cursor-pointer">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
