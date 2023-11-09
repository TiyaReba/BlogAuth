import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [user,setInputs] = useState({})
  const inputHandler = (e)=>{
 
    setInputs({
      ...user,[e.target.name]:e.target.value
    })
    console.log(user)
  }
  const addHandler=()=>{
    console.log("clicked",user);
    axios.post("http://localhost:8000/api/login",user)
    .then((response)=>{
      console.log(response)
      //alert(response.data.message)
      
      if (response.data.message=="login successful") {
        const token =response.data.token;
        const userId = response.data.data._id;
        console.log(token);
        console.log(userId);
        sessionStorage.setItem("userToken",token);
        sessionStorage.setItem("userId",userId);
        navigate('/viewallposts')
      } else {
        alert("Invalid credentials")
      }
    })
    .catch(err=>console.log(err))
 

  }
  return (
    <div>
    

      <div className="container">
        <div className="row">
          <div className="col col-12 col-sm-12 col-md-12">
            <h1 className=""> Blog App - Login </h1>

            <div className="row g-3">
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12">
                <label htmlFor="" className="form-label">
                  {" "}
                  Username{" "}
                </label>
                <input type="text" className="form-control" name="username" onChange={inputHandler}/>
              </div>
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12">
                <label htmlFor="" className="form-label">
                  {" "}
                  Password{" "}
                </label>
                <input type="password" id="" className="form-control" name="password" onChange={inputHandler} />
              </div>
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12">
                <button className="btn btn-success" onClick={addHandler}> LOGIN </button>
              </div>
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12">
                <a href="/register"> New Users Click Here </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
