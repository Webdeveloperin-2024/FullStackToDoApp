import jwt from "jsonwebtoken"

 const auth = async (req,res,next) => {
    try {
       
        const token = req.cookies.token || req?.headers?.authorization?.split(" ")[1]
        if (!token) {
            return res.status(401).json({
           message:"provide token "
       })
        }
        
       const decode= await jwt.verify(token,process.env.SECRET_KEY) 
   
        if (!decode) {
            return res.status(401).json({
                message:"Invalid or expired token"
            })
        }

        req.userId = decode.userId
             next()
    
    } catch (error) {
        return res.status(500).json({
            message:"server error"
        })
    }
}

export default auth