import React, { useState } from 'react'
import axios from "axios";
import {Link} from "react-router-dom"
import "./css.css";

function AddMeme() {
  const [name,setName]=useState("");
  const [description,setDescription]=useState("");
  const [link,setLink]=useState("");

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
    const data= await  axios.post('http://localhost:4000/api/add',
      {name,description,link});
       alert(data.data.message);
     setName("");
     setDescription("");
     setLink("");
    }
     catch(err){
      alert("error while adding Link");
     }
  } 

  return (
    <>
     <nav>
     <Link to="/">Home </Link>
        <Link to="/add">Add Meme </Link>
        <Link to="/view">View Meme</Link>
        <Link to ="/addstudy">Add study Material </Link>
        <Link to ="/viewstudy">View study Material </Link>
      </nav>

    <form onSubmit={(e)=>handleSubmit(e)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
           value={name}
          onChange={(e)=>setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
           value={description}
          onChange={(e)=>setDescription(e.target.value)
           
          }
          required
        />
      </div>
      <div>
        <label htmlFor="link">Link:</label>
        <input
          type="text"
          id="link"
          name="link"
          required
           value={link}
          onChange={(e)=>setLink(e.target.value)}
        />
      </div>
      <button type="submit" >Submit</button>
    </form>
    </>
  )
}

export default AddMeme