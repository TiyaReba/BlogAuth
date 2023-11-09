import React, { useState } from "react";
import axios from "axios";

const Addpost = (props) => {
  console.log("props.data",props.data.title)
  console.log("props.method",props.method)
  const[post,setPost] = useState(props.data)
  const [userid,setUserid] = useState(sessionStorage.getItem("userId"));
  const[userToken,setUserToken] = useState(sessionStorage.getItem("userToken"));

  const inputHandler=(e)=>{
    const { name, value } = e.target;
    setPost({
      ...post,[name]:value
    })
    // setPost({
    //   ...post,[e.target.name]:e.target.value
    // })
    console.log(post)
  }
 const data ={"userId":userid,
 "title":post.title,
"content":post.content,
"img_url": "String","token": userToken}


  const addPost = ()=>{
    console.log("add clicled")
    if(props.method==="post"){
      console.log(userToken);
      console.log(userid)
    axios.post("http://localhost:8000/api/posts",data)
    .then((response)=>{
      alert(response.data.message)
    })
    .catch(err=>console.log(err))
  }

  if(props.method==="put"){
  axios.put("http://localhost:8000/api/edit/"+post._id,post)
  .then((response)=>{
    // alert(response.data.message)
    if (response.data.message==="updated successfully") {
     alert(response.data.message)
      window.location.reload(false);

      
    } else {
      alert("not updated")
    }
  })}
  }
  return (
    <div>
   

      <div className="container">
        <div className="row">
          <div className="col col-12 col-sm-6 col-md-6">
            <br />
            <div className="row g-3">
              <div className="col col-12 col-sm-12 col-md-12">
                <textarea
                  name="title"
                  id=""
                  cols="30"
                  rows="2"
                  value={post.title}
                  className="form-control"
                  placeholder="Post title"
                  onChange={inputHandler}
                ></textarea>
              </div>
              <div className="col col-12 col-sm-12 col-md-12">
                <textarea
                  name="content"
                  id=""
                  cols="30"
                  rows="10"
                  value={post.content}
                  className="form-control"
                  placeholder="Type a post"
                  onChange={inputHandler}
                ></textarea>
              </div>

              <div className="col col-12 col-sm-12 col-md-12">
                <input
                  type="url"
                  name="img_url"
                  id=""
                 value={post.img_url}
                  className="form-control"
                  placeholder="Image url"
                  onChange={inputHandler}
                />
              </div>
              <div className="col col-12 col-sm-12 col-md-12">
                <button className="btn btn-success" onClick={addPost}> Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addpost;
