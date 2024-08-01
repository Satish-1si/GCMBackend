const JWT=require("jsonwebtoken")
module.exports=(payload)=>{
        const NewToken=JWT.sign(payload,process.env.SecretString,{expiresIn:"1d"})
        return NewToken
}