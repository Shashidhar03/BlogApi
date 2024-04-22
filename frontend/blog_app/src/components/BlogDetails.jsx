import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function BlogDetails() {
  const id = useParams().id;
  const navigate = useNavigate();

  const [blog, setBlog] = useState();
  const [inputs,setInputs]=useState({
    title:"",
    description:""
  });
  const fetchDetails = async () => {
    const response = await axios.get(`http://localhost:5000/api/blogs/${id}`).catch((err) => console.log(err));
    const data = await response.data;
    console.log(data);
    return data;
  }

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data)
        setInputs(
          {
            title:data.title,
            description:data.description
          }
        )
      
    });
  }, [id])

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/blogs/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleChange=(e)=>{
    setInputs({...inputs,[e.target.name]:e.target.value});
  } 

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest()
    .then((data)=>console.log(data))
    .then(()=>navigate("/myBlogs"));
  }

  

  return (
    <div>
      {inputs && <form style={{ width: "40%", margin: "30px auto", height: "60%" }} onSubmit={handleSubmit}>
        <div className="mb-1">
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Title' name="title" onChange={handleChange} value={inputs.title} />
        </div>
        <div className="mb-3">
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" placeholder='Description' name="description" onChange={handleChange} value={inputs.description}></textarea>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>}
    </div>
  )
}

export default BlogDetails;
