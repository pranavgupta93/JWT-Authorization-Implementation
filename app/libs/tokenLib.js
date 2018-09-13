const jwt = require('jsonwebtoken')
const shortid = require('shortid')
const secretKey = 'someVeryRandomStringThatNobodyCanGuess';
let generateToken=((data,cb)=>{
    try{
        console.log("generate token lib")
        let claims = {
            jwtid: shortid.generate(),
            iat: Date.now(),
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
            sub: 'authToken',
            iss: 'edChat',
            data: data
          }
          let tokenDetails = {
            token: jwt.sign(claims, secretKey),
            tokenSecret : secretKey
          }
          cb(null, tokenDetails)
    }
    catch(err){
        cb(err,null)
    }
})

let verifyToken=(token,secret,cb)=>{
//http://calebb.net/
    jwt.verify(token,secret,function(err,decoded){
        if(err){
            console.log("error");
            cb(err,null)
        }
        else{
            cb(null,decoded);
        }
    })

}

module.exports={
generateToken:generateToken,
verifyToken:verifyToken
}