const bcrypt = require('bcrypt')
const saltRounds = 10;

let hashPassword=(plainPassword)=>{
    let salt=bcrypt.genSaltSync(saltRounds);
    let hash=bcrypt.hashSync(plainPassword,salt);
    return hash;
}

let comparePassword=(plainPassword,hash,cb)=>{
    bcrypt.compare(plainPassword,hash,(err,match)=>{
        if(err){
            cb(err,null);
        }
        else{
            cb(null,match);
        }
    })
}

module.exports={
    hashPassword:hashPassword,
    comparePassword:comparePassword
}