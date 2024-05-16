const express = require('express')
const app = express();
const router = express.Router()

const employee = require('./employee');

router.get("/",async(req,res)=>{
    const x =await  employee.find();
    res.json({x});
})
module.exports = router;