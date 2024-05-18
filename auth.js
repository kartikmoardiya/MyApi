const passport = require('passport');
const LocalStrategy  = require('passport-local').Strategy;

const employee = require('./employee');
passport.use(new LocalStrategy(async(USERNAME,password,done)=>{

    try{
        console.log('Received',USERNAME,password);
        const user = await employee.findOne({username:USERNAME});
        if(!user){
            return done(null,false,{message:"Incorrect username"});
        }
        const isPasswordMatch = user.comparePassword(password);
        if(isPasswordMatch){
            return done(null,user);
        }
        else{
            return done(null,false,{message:"Incorrect Password"})
        }
    }
    catch(error)
    {
        return done(error);
    }
  }))

  module.exports = passport;