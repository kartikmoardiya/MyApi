const jwt = require('jsonwebtoken');

const jwtAuthMiddleware=(req,res,next)=>{

    // first check request headers has authorized or not
    const authorization  = req.headers.authorization;
    if(!authorization){
        return res.status(401).json({error:"token not found"});
    }
    // Extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({error:"Unauthorized"});
    }
    try{
        // verify jwt token
        const decoded = jwt.verify(token,process.env.JWT_SECRET,{expiresIn:30000});

        // Attach user information to the request object
        req.user = decoded;
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({error:"Invalid Token"});
    }
}


// function to genrate token
const genratetoken = (userdata)=>{
    // Genrate a new JWT token using user data
    return jwt.sign(userdata,process.env.JWT_SECRET);
}
module.exports = {jwtAuthMiddleware,genratetoken};