const mongoose=require('mongoose');
const authModel=mongoose.model('AuthModel');
const token = require('./../libs/tokenLib')

let isAuthorized=(req,res,next)=>{

    if(req.header('authToken')){
        authModel.findOne({authToken:req.header('authToken')},(err,authDetails)=>{
            if(err){
                console.log(err);
            }
            else if(authDetails==''||authDetails==null){
                res.send("Token has been expired or not valid");
            }
            else{
                token.verifyToken(authDetails.authToken,authDetails.tokenSecret,(err,decoded)=>{
                    if(err){
                        console.log("failed to auth")
                    }
                    else{
                        req.user={userId:decoded.data.userId}
                        next();
                    }
                })
            }
        })
    }
    else{
        res.send("auth token missing in request")
    }
}
module.exports={
    isAuthorized:isAuthorized
}