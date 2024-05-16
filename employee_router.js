const express = require('express')
const app = express();
const router = express.Router()

const employee = require('./employee');

router.get("/",async(req,res)=>{
    const x =await employee.find();
    res.json({x});
})
router.post("/create", async (req, resp) => {
    let data = new employee(req.body);
    let result = await data.save();
    resp.send(result);
  });
  router.delete("/delete/:_id", async (req, resp) => {
    let data = await employee.deleteOne(req.params);
    resp.send(data);
  });
  router.put("/update/:_id", async (req, resp) => {
    console.log(req.params);
    let data = await Product.updateOne(req.params, 
      { $set: req.body });
    resp.send(data);
  });
  
module.exports = router;