//3rd part imports
import jwt from "jsonwebtoken"

//creating for jwt authentication
const jwtAuth = async(req,res,next)=>{
    try {
        const token = req.headers['authorization']
        if(!token){
            res.status(400).send("please login to continue")
        }
        const actualToken = token.startsWith("Bearer ")?token.split(" ")[1] : token
        const verification = jwt.verify(actualToken,"SECRETT")
        req.user = verification
        next()
    } catch (error) {
        res.status(403).send("invalid or expired token")
    }
}

export default jwtAuth