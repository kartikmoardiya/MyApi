const express = require('express')
const app = express()
const db = require('./db')
const product_router = require('./employee_router')
const body_pardser = require('body-parser')

app.use(body_pardser.json());

const PORT = process.env.PORT||3000;

app.use('/employee',product_router)
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

app.get('/',passport.authenticate('local',{session:false}),function(req,res){
    res.send('welcome to our hotel');
})
app.listen(PORT,()=>{
    console.log.apply("Listening on port")
})
