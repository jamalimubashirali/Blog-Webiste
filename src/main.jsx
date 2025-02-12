import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AuthWrapper from "./components/AuthWrapper.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AddPostPage from "./pages/AddPostPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import EditPostPage from "./pages/EditPostPage.jsx";


const router = createBrowserRouter([
  {
    path : '/',
    element : <App />,
    children : [
      {
        path : '/',
        element : <HomePage />
      }, 
      {
        path : '/login',
        element : (
          <AuthWrapper authentication={false}>
            <LoginPage />
          </AuthWrapper>
        )
      },
      {
        path : '/signup',
        element : (
          <AuthWrapper authentication={false}>
            <SignUpPage />
          </AuthWrapper>
        )
      },
      {
        path : '/add-post',
        element : (
          <AuthWrapper authentication>
            <AddPostPage />
          </AuthWrapper>
        )
      },
      {
        path:'/edit-post/:slug',
        element : (
          <AuthWrapper>
            <EditPostPage />
          </AuthWrapper>
        )
      },
      {
        path:'/posts/:slug',
        element : (
          <AuthWrapper>
            <PostPage />
          </AuthWrapper>
        )
      }
    ]
  }
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
);
