import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [showPassword,setShowPassword]=useState(false);

  const handleLogin = async(e)=>{

    e.preventDefault();

    const response = await fetch("http://localhost:3000/auth/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    });

    const data=await response.json();
    
    console.log("Login Response:", data);
    console.log("User Object:", data.user);

    if(!response.ok){
      alert(data.message);
      return;
    }

    localStorage.setItem("token",data.token);
    localStorage.setItem("user",JSON.stringify(data.user));

    if(data.user.role==="admin"){
      navigate("/admin");
    }else{
      navigate("/dashboard");
    }

  };

  return (

<div className="login-page">

<div className="login-card">

<h1>Welcome Back 👋</h1>

<p>Login to continue your journey.</p>

<form onSubmit={handleLogin}>

<div className="input-group">

<FaEnvelope className="icon"/>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

</div>

<div className="input-group">

<FaLock className="icon"/>

<input
type={showPassword?"text":"password"}
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<span
className="eye"
onClick={()=>setShowPassword(!showPassword)}
>

{showPassword?<FaEyeSlash/>:<FaEye/>}

</span>

</div>

<div className="login-options">

<label>

<input type="checkbox"/>

Remember me

</label>

<a href="#">Forgot Password?</a>

</div>

<button>

Login →

</button>

</form>

<div className="bottom">

Don't have an account?

<span onClick={()=>navigate("/Signup")} className="signup-link">

 Sign-in

</span>

</div>

</div>

</div>

  );

}

export default Login;