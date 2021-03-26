const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
const authHeader=req.get('Authorization');

if(!authHeader){
    return res.status(401).json({
        message:"Not authorized"
    });
}

const token=authHeader.split(' ')[1];

let decodedToken;
try{
    //console.debug("secret " ,process.env.TOKEN_SECRET)

  decodedToken=jwt.decode(token, process.env.TOKEN_SECRET);

 // console.debug("decoded ",decodedToken)
  

}catch(error){console.log(error)
    return res.status(500).json({
        
        message:error
    });
};

if(!decodedToken){
    return res.status(401).json({
        message:"not authorized"
    });
    
}
req.userId=decodedToken.userId;
//console.log('req',req.userId)

next();
}

