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
  try{
    let data = new employee(req.body);
    let result = await data.save();

    const token = genratetoken(response.username);
    console.log("Token is:",token);
    res.status(200).json({response:response,token:token});
  }
  catch(err){
    res.status(500).json(response);
  }
  });
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