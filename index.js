const express = require('express')
const app = express()
const db = require('./db')
const product_router = require('./employee_router')
const body_pardser = require('body-parser')

app.use(body_pardser.json());

const PORT = process.env.PORT||3000;

const employee = require('./employee');
const passport = require('passport');
const LocalStrategy  = require('passport-local').Strategy;

passport.use(new LocalStrategy(async(USERNAME,password,done)=>{

  try{
      console.log('Received',USERNAME,password);
      const user = await employee.findOne({username:USERNAME});
      if(!user){
          return done(null,false,{message:"Incorrect username"});
      }
      const isPasswordMatch = user.password===password?true:false;
      if(isPasswordMatch){
          return done(null,user);
      }
      else{
          return done(null,false,{message:"Incorrect Password"})
      }
  }
  catch(err)
  {
      return done(err);
  }
}))

app.use(passport.initialize());
const localAuthmiddleware = passport.authenticate('local',{session:false});
app.get('/',function(req,res){
    res.send('welcome to our hotel');
})
app.use('/employee',localAuthmiddleware,product_router)

app.listen(PORT,()=>{
    console.log.apply("Listening on port")
})
