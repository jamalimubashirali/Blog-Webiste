import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth.service.js";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "../src/components/index.js";
import { Outlet } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="bg-gray-700 flex mx-auto justify-center items-center">
        ...Loading the data
      </div>
    );
  }

  return (
    <div className="">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
