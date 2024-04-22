import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Card(props) {
    const navigate=useNavigate();
    const handleClick=(e)=>
    {
        navigate(`/myBlogs/${props.id}`);
    }
    const deleteRequest= async ()=>
    {
        const res=await axios.delete(`http://localhost:5000/api/blogs/${props.id}`).catch((err)=>console.log(err));
        const data=await res.data;
        console.log(data);
    }
    const handleDelete=()=>
    {
        deleteRequest()
      .then(() => navigate("/blog"));
    }
    return (

        <div className="card-grid" >
            <div  >
                <br />
                <div className="card">
                    {
                        props.isuser && <div className="card-buttons" style={{display:"flex",justifyContent:"flex-end",gap:"10px",margin:"10px"}}>
    
                            <button  onClick={handleClick} className="btn btn-primary button-btn-slide-text" >
                                <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
                                <span><strong>Edit</strong></span>
                            </button>
                            <button onClick={handleDelete} className="btn btn-primary button-btn-slide-text">
                                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                <span><strong>Delete</strong></span>
                            </button>
                        </div>
                    }
                    <img src={props.src} className="card-img-top" alt="..." style={{height:"300px",width:"100%"}}/>
                    <div className="card-body">
                        <h5 className="card-title">{props.title}</h5>
                        <p className="card-text"><b style={{ fontSize: "15px" }}>{props.name}</b>{" : "}{props.content}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;
