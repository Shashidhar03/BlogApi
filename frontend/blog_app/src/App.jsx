import Auth from "./components/Auth.jsx";
import Blog from "./components/Blog.jsx";
import Header from "./components/Header.jsx";
import AddBlog from "./components/AddBlog.jsx";
import UserBlogs from "./components/UserBlogs.jsx";
import BlogDetails from "./components/BlogDetails.jsx";

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/index.js";


function App() {
  const dispath=useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(()=>{
    if(localStorage.getItem("userID"))
    {
      dispath(authActions.login());
    }
  },[dispath]);
  return (
    <>
      <Header />
      <Routes>
        {!isLoggedIn ?
          <Route path="/auth" element={<Auth />} />
          : <>
              <Route path="/blog" element={<Blog />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetails />} />
              <Route path="/blogs/add" element={<AddBlog />} />
          </>
        }
      </Routes>
      </>);
}

export default App;
