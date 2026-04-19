import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET || "fallback_secret_123";

export const getToken = async(userId) =>{
    
    
    try{
         const token =jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:"7d"})
          console.log(token);
         return token
         
    }catch(error){
        console.log(error);
    }
    
}