import React, { useEffect, useState } from "react";
import axios from "axios";
import Addpost from "./Addpost";

const ViewallPosts = () => {
  const [data, setData] = useState([]);
  var[update,setUpdate] = useState(false);
  var[singleValue,setSingleValue]=useState([])
  const[userToken,setUserToken] = useState(sessionStorage.getItem("userToken"));
  const fetchDataFromApi = () => {
    axios
      .get(
        "http://localhost:8000/api/viewall/"+userToken
      )
      .then((response) => {
        console.log(response.data);

        setData(response.data);
      });
  };

const deleteBlog=(id)=>{
 console.log("delete clicked",id);
 axios.delete("http://localhost:8000/api/delete/"+id)
 .then((response)=>{
  alert(response.data.message)
 })
  }

  const updateBlog = (val)=>{
    console.log("update clicked",val);
    setUpdate(true);
    setSingleValue(val)
  }
  useEffect(() => {
    fetchDataFromApi();
  }, []);

  let finalJSX =(
  
  <div className="container">
  <div className="row">
    <div className="col col-12 col-sm-12 col-md-12">
      <div className="row g-5 pt-3">
        {data.map((value, index) => {
          return (
            <div className="col col-12 col-sm-6 col-md-6 col-lg-6 d-flex align-items-stretch" key={index}>
              <div className="card mb-3"  >
                <div className="row g-0" >
                  <div className="col-md-4">
                    <img
                      src={value.img_url}
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title"> {value.title} </h5>
                      <p className="card-text"> {value.content} </p>
                      <p className="card-text">
                        <small class="text-body-secondary">
                          Last updated : {value.createdAt}{" "}
                        </small>
                      </p>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          <button className="btn btn-danger" onClick={()=>deleteBlog(value._id)}>Delete</button>
                          
                        </small> &nbsp;
                    
                      
                        <small className="text-body-secondary">
                          <button className="btn btn-danger" onClick={()=>updateBlog(value)}>Update</button>
                          
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</div>
)
if(update) finalJSX=<Addpost method="put" data={singleValue}/>
 return (
  
    
     finalJSX
     
   
    )
      

  
};

export default ViewallPosts;
