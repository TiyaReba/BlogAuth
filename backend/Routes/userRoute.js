const express = require("express");
const router = express.Router();
const userData = require("../Model/user");
const jwt = require("jsonwebtoken")

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/login", async (req, res) => {
  console.log(req.body)
 let username = req.body.username;
 let password = req.body.password;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  const user =  await userData.findOne({username: username});
  console.log(user)
  if(!user){
    res.json({message:"user not found"})
  }
  try{
    if(user.password==password){
     jwt.sign({email:username,id:user._id},"ict",{expiresIn:'1d'},
     (error,token)=>{
      if (error) {
        res.json({message:"Token not generated"})
        
      } else {
        res.json({message:"login successful",token:token,data:user});
 
      }
     }
     )

    }
    else{
      res.json({message:"login failed"})

    }
  }
  catch(err){

  }



});

router.post("/user", async (req, res) => {
  try {
    console.log(req.body);
    let item = req.body;
    const newUser = userData(item);
    const saveData = await newUser.save();
    res.json({message:"Registered successful"})
  } catch (error) {
    res.json("Unable to register");
  }
});
  router.post("/viewmyprofile", async (req, res) => {
    console.log("jhdj")
    const item= await userData.find(req.body)
    res.json(item)
  })

module.exports = router;
