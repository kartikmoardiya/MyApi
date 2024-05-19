const express = require('express')
const app = express();
const router = express.Router()
const {jwtAuthMiddleware,genratetoken}=require('./jwt'); 

const employee = require('./employee');

router.get("/",async(req,res)=>{
    const x =await employee.find();
    res.json({x});
})
router.post("/signup", async (req, resp) => {
  try {
      let data = new employee(req.body);
      let result = await data.save();

      const payload = {
        id:response.id,
        username:response.username
      }
      const token = genratetoken(req.body.username); // Use req.body.username
      console.log("Token is:", token);

      resp.send({ result, token });
  } catch (error) {
      console.error("Error occurred during signup:", error);
      resp.status(500).send({ message: "Server error occurred", error: error.message });
  }
});
router.post('/login',async(req,res)=>{
  try {
    // extract username and password from the request body
    const{username,password} = req.body;

    const user = await employee.findOne({username:username});

    if(!user||(await user.comparePassword(password))){
      return res.status(401).json({error:"invalid username or password"});
    }
    // genrate token
    const payload ={
      id:user.id,
      username:user.username
    }
    const token = genratetoken(payload);

    res.json({token})
  } catch (err) {
    console.error(err);
    res.status(500).json({error:"Internal server error"})
  }

})

  router.delete("/delete/:_id", async (req, resp) => {
    let data = await employee.deleteOne(req.params);
    resp.send(data);
  });
  router.put("/update/:_id", async (req, resp) => {
    console.log(req.params);
    let data = await employee.updateOne(req.params, 
      { $set: req.body });
    resp.send(data);
  });   
  
module.exports = router;