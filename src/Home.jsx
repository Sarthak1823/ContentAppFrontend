import React, { useState } from 'react'
import {Link} from "react-router-dom"
import "./css.css";
import axios from "axios";

function Home() {
  const [isLogin, setIsLogin] = useState(false);
    const [name,setName]=useState(".");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

  const toggleForm = () => {
      setIsLogin(!isLogin);
  };

  const handleRegister= async (e)=>{
     e.preventDefault();
      if(password.length<8){
          alert("Password should be atleast 8 characters long");
          setPassword("");
          return ;
      }
      try{ 
     const res= await axios.post("https://contentappbackend.onrender.com/api/register",{name,email,password});
       alert(res.data.message);
      }
      catch(err){
        alert(res.data.message);
      }
      setName("");
      setEmail("");
      setPassword("");
  }
   
  const handleLogin=async (e)=>{
       e.preventDefault();
       try{
          const res=await axios.post("https://contentappbackend.onrender.com/api/login",{email,password});
          alert(res.data.message);
       }
       catch(err){
       alert(err.response.data.message);
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
    <div>
            {isLogin ? (
                <div id="login-form">
                    <form onSubmit={(e)=>handleLogin(e)}>
                        <div >
                            <label htmlFor="login-email">Email</label>
                            <input type="email" id="login-email" name="email" value={email} required 
                             onChange={(e)=>setEmail(e.target.value)} class ="home_input"/>
                        </div>
                        <div  >
                            <label htmlFor="login-password">Password</label>
                            <input type="password" id="login-password" name="password" value={password} required 
                            onChange={(e)=>setPassword(e.target.value)} class ="home_input"/>
                        </div>
                        <div>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                    <p>Don't have an account? <a href="#!" onClick={toggleForm}>Register</a></p>
                </div>
            ) : (
                <div id="register-form">
                    <form onSubmit={(e)=>handleRegister(e)}>
                        <div >
                            <label htmlFor="reg-name">Name</label>
                            <input type="text" id="reg-name" name="name" placeholder='Enter Name..' value={name}  required 
                             onChange={(e)=>setName(e.target.value)} class ="home_input"/>
                        </div>
                        <div >
                            <label htmlFor="reg-email">Email</label>
                            <input type="email" id="reg-email" name="email" required value={email}
                           onChange={(e)=>setEmail(e.target.value) } class ="home_input"/>
                        </div>
                        <div >
                            <label htmlFor="reg-password">Password</label>
                            <input type="password" id="reg-pas sword" name="password" required value={password}
                            onChange={(e)=>setPassword(e.target.value)} class ="home_input"/>
                        </div>
                        <div>
                            <button type="submit" class="register">Register</button>
                        </div>
                    </form>
                    <p>Already registered? <a href="#!" onClick={toggleForm}>Log in</a></p>
                </div>
            )}
        </div>
    </>
  )
}

export default Home
