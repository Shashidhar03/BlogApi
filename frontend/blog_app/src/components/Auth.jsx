import React from 'react'
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';



function Auth() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [isSignup, setIsSignup] = useState(false);

  const handleChange=(e)=>
  {
    setInputs({...inputs,[e.target.name]:e.target.value})
  }

  const handleSubmit=async (e)=>
  {
    e.preventDefault();
    if(isSignup)
    {
      try {
        const res=await axios.post("http://localhost:5000/api/signup",{name:inputs.name,email:inputs.email,password:inputs.password});
        // console.log(res.data);
        dispatch(authActions.login());
        console.log(res.data.user._id);
        localStorage.setItem("userID",res.data.user._id);
        navigate("/blog");
      } catch (error) {
        console.log(error);
      }
    }
    else
    {
      try {
        const res=await axios.post("http://localhost:5000/api/login",{email:inputs.email,password:inputs.password});
        // console.log(res.data);
        dispatch(authActions.login());
        console.log(res.data.user._id);
        localStorage.setItem("userID",res.data.user._id);
        navigate("/blog");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <section className="vh-100" style={{backgroundColor: "inherit"}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
                <div className="card-body p-5 text-center" >

                  <h1 className="mb-5"> {isSignup? "Signup":"Login"} </h1>

                  {isSignup && <div className="form-outline mb-4">
                    <input type="text"  className="form-control form-control-lg" name="name" value={inputs.name} onChange={handleChange} placeholder="Enter your Name" style={{fontSize:"15px",height:"20px"}}/>
              
                  </div>}

                  <div className="form-outline mb-4">
                    <input type="email" id="typeEmailX-2" className="form-control form-control-lg" name="email" value={inputs.email} onChange={handleChange} placeholder="Enter your Email" style={{fontSize:"15px",height:"20px"}}/>
                    
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="typePasswordX-2" className="form-control form-control-lg" name="password" value={inputs.password} onChange={handleChange} placeholder="Enter your Password" style={{fontSize:"15px"}}/>

                  </div>

                  <button className="btn btn-primary btn-lg btn-block" type="submit">{isSignup?"Signup":"Login"}</button><br/><br/>
                  <button className="btn btn-primary " onClick={()=>setIsSignup(!isSignup)}>change to {isSignup?"Login":"Signup"}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </form>
    </div>
  )
}

export default Auth
