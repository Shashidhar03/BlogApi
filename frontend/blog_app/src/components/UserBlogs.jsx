import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { set } from 'mongoose';
import Card from './Card.jsx';

function UserBlogs() {
  const [blogs,setblogs]=useState();
  const id=localStorage.getItem("userID");
  // console.log(id);
  const sendRequest = async () => {
    const response=await axios.get(`http://localhost:5000/api/blogs/user/${id}`).catch((err) => console.log(err));
    console.log(response.data)
    const data=await response.data;
    return data;
  }
  useEffect(() => {
    sendRequest().then((data) => setblogs(data));
  }, []);
  return (
    <div className="container">
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
                  name={blogs.user.name}
                  isuser={localStorage.getItem("userID")===blogs.user._id}
                />
              );
            })}
        </div>
      </div>
  )
}

export default UserBlogs
