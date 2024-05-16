const express = require('express')
const app = express()
const db = require('./db')
const product_router = require('./employee_router')
const body_pardser = require('body-parser')

app.use(body_pardser.json());

const PORT = process.env.PORT||3000;

app.use('/employee',product_router)

app.get('/',(req,res)=>{
    res.json({msg:"hello world"})
})
app.listen(PORT,()=>{
    console.log.apply("Listening on port")
})
