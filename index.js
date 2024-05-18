const express = require('express')
const app = express()
const db = require('./db')
const employee_router = require('./employee_router')
const body_pardser = require('body-parser')

app.use(body_pardser.json());

const PORT = process.env.PORT||3000;
const passport = require('./auth');

app.use(passport.initialize());
const localAuthmiddleware = passport.authenticate('local',{session:false});
app.get('/',function(req,res){
    res.send('welcome to our hotel');
});
app.use('/employee',employee_router)
app.listen(PORT,()=>{
    console.log.apply("Listening on port")
})
