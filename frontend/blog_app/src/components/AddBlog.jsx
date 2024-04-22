import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";

function AddBlog() {
  const navigate=useNavigate();

  const sendRequest=async (inputs)=>
  {
      const res=await axios.post("http://localhost:5000/api/blogs/addblog",{title:inputs.title,description:inputs.description,image:inputs.src,user:localStorage.getItem("userID")}).catch((err) => console.log(err));
      const data=await res.data;
      return data;
  }

  const [inputs,setInputs]=useState({
    title:"",
    description:"",
    src:""
  });

  const handleChange=(e)=>{
    setInputs({...inputs,[e.target.name]:e.target.value});
  } 

  const handleSubmit=(e)=>{
    e.preventDefault();
    sendRequest(inputs).then((data) => navigate("/blog"));
  }

  return (
    <div style={{width:"50%",margin:"100px auto",height:"100vh",  }} >
    <form  onSubmit={handleSubmit}>
      <div className="mb-2">
        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Title'name="title" onChange={handleChange} value={inputs.title}/>
      </div>
      <div className="mb-3">
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" placeholder='Description' name="description" onChange={handleChange} value={inputs.description}></textarea>
      </div>
      <div className="mb-1">
        <input type="text" className="form-control"  placeholder='Image URL'name="src" onChange={handleChange} value={inputs.src}/>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  )
}

export default AddBlog
