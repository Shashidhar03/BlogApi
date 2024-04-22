import React, { useEffect } from 'react'
import axios from "axios";
import { useState } from "react";
import Card from "../components/Card.jsx";

function Blog() {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      const data = await res.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setBlogs(data);
    });
  }, []);

  console.log(blogs);

  return (
    <div className="container" style={{margin:"50px"}}>
      <div className="row" style={{margin:"0px 450px"}}>
        {blogs &&
          blogs.blogs.map((blog) => {
            return (
              <Card
                key={blog._id}
                id={blog._id}
                title={blog.title}
                content={blog.description}
                src={blog.image}
                name={blog.user.name}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Blog;
