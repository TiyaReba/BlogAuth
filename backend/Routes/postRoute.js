const express = require("express");
const router = express.Router();
const postData = require("../Model/posts");
const jwt = require("jsonwebtoken");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Read
router.get("/viewall/:token", async (req, res) => {
  let token = req.params.token
  console.log(token)
  let data =  await postData.find();
  jwt.verify(req.params.token,"ict",
    (error,decoded)=>{
      if(decoded && decoded.email){
       
        res.json(data);
      }else{
        res.json({ message: "unauthorised user" });
      }
    }
    )
   
 
});

router.post("/posts", (req, res) => {
  jwt.verify(req.body.token, "ict", 
    (error, decoded) => {
      if (decoded && decoded.email) {
        console.log(req.body);
        let item = req.body;
        const newPost = postData(item);
        newPost.save();
        res.json({ message: "post added successfully" });
    } else {
      res.json({ message: "unauthorised user" });
    }
  });
});
// to view my post
router.post("/viewmypost", async (req, res) => {

  let data = await postData.find(req.body);
  res.json(data);
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    console.log(postId);
    await postData.findByIdAndDelete(postId);
    console.log("Deleted");
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json("Unable to delete");
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    console.log("body");
    const postId = req.params.id;
    console.log(postId);
    const updated = await postData.findByIdAndUpdate(postId, req.body);
    res.json({ message: "updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json("Unable to update");
  }
});
module.exports = router;
