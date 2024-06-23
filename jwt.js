const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req,res,next)=>{
    //First check the request header has authorization or not
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error: 'Token not found!'})

    //Extract the jwt token form the request header
    const token = req.headers.authorization.split(' ')[1]
    if(!token) return res.status(401).json({error: 'unauthorized'})
    
    try{
        //Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //attach user information to the request object
        req.user = decoded
        next()
        }catch(err){
            res.status(401).json({error: 'invalid token'})
        }
}

//Function to generate Token
const generateToken = (userData)=>{
    //Generate a new JWT token using user Data
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 30000})
    }


module.exports = {jwtAuthMiddleware,generateToken};  //export the middleware function  to be used in routes