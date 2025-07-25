const jwt = require('jsonwebtoken');
const generateTokenAndSetCookies=(res,userId)=>
{
    const token=jwt.sign({userId},process.env.jwt_secret,{expiresIn:'1h'})
    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:'strict',
        maxAge:7*24*60*60*1000
    })
    return token;
}
module.exports=generateTokenAndSetCookies;


