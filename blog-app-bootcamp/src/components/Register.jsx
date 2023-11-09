import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
const Register = () => {
  const navigate = useNavigate()
  const [inputs,setInputs] = useState({})
  const inputHandler = (e)=>{
 
    setInputs({
      ...inputs,[e.target.name]:e.target.value
    })
    console.log(inputs)
  }

  const submitHandler =()=>{
    console.log("clicked",inputs);
    axios.post("http://localhost:8000/api/user",inputs)
    .then((response)=>{
      console.log(response);
      if (response.data.message==="Registered successful") {
      alert(response.data.message)
       navigate('/')
        
      } else {
        
      }
    })
    .catch(err=>console.log(err))
      
  }
  return ( 
    <div>
      <div className="container">
        <div className="row">
          <h2 className="py-3">Sign-Up</h2>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-12">
            <div className="row g-3">
              <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                <label htmlFor="" className="form-label">
                  {" "}
                  Name
                </label>
                <input type="text" className="form-control" name='name' onChange={inputHandler} />
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                <label htmlFor="" className="form-label">
                  {" "}
                  Email Id
                </label>
                <input type="text" className="form-control"name='email' onChange={inputHandler} />
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <label htmlFor="" className="form-label">
                  {" "}
                  Address
                </label>
                <textarea
                  name="address"
                  id=""
                  cols="30"
                  rows="5"
                  className="form-control"
                  onChange={inputHandler}
                ></textarea>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                <label htmlFor="" className="form-label">
                  {" "}
                  Phone
                </label>
                <input type="text" className="form-control" name='phone' onChange={inputHandler} />
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                <label htmlFor="" className="form-label">
                  {" "}
                  Username
                </label>
                <input type="text" className="form-control" name='username' onChange={inputHandler} />
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                <label htmlFor="" className="form-label">
                  {" "}
                  Password
                </label>
                <input type="password" className="form-control" name='password' onChange={inputHandler}/>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <button className="btn btn-danger" onClick={submitHandler}>Register</button>
              </div>
              <div className="col col-12 col-sm-12 col-md-12 col-lg-12">
                <a href="/"> Back to LogIn </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
