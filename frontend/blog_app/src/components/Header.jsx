import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Store } from "@reduxjs/toolkit";
import { authActions } from "../store";


function Header() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  const dispatch = useDispatch();
  return (

    <nav className="navbar navbar-expand-lg navbar-light" style={{ background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)" }}>
      <Link className="navbar-brand" to="/blog">
        <span style={{ color: "white", fontSize: "30px" }}>BlogApp</span>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav"  >
          {isLoggedIn && <>
            <li className="nav-item active">
            <Link className="nav-link" to="/blog">
              <span style={{ color: "white", fontSize: "20px" }}>Allblogs</span>
            </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/myBlogs">
                <span style={{ color: "white", fontSize: "20px" }}>MyBlogs</span>

              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blogs/add">
                <span style={{ color: "white", fontSize: "20px" }}>AddBlog</span>

              </Link>
            </li>
          </>}

          {!isLoggedIn && 
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/auth">
                  <span style={{ color: "white", fontSize: "20px" }}>Login</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/auth">
                  <span style={{ color: "white", fontSize: "20px" }}>Signup</span>

                </Link>
              </li>
            </>
          }
          {
            isLoggedIn && 
            <li className="nav-item">
            <Link className="nav-link" to="/auth" onClick={() => { dispatch(authActions.logout()) }}>
              <span style={{ color: "white", fontSize: "20px" }}>Logout</span>

            </Link>
            </li>
          }

        </ul>
      </div>
    </nav>

  );
}

export default Header;
