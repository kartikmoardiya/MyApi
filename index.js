const express = require('express')
const app = express()
const db = require('./db')
const product_router = require('./employee_router')
const body_pardser = require('body-parser')

app.use(body_pardser.json());
app.use('/employee',product_router)
const PORT = process.env.PORT||3000;

const passport = require('./auth');



app.use(passport.initialize());
const localAuthmiddleware = passport.authenticate('local',{session:false});
app.get('/',localAuthmiddleware,function(req,res){
    res.send('welcome to our hotel');
})


app.listen(PORT,()=>{
    console.log.apply("Listening on port")
})
