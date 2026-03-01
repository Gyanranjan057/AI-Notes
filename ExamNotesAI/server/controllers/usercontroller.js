import usermodel from "../models/usermodel.js"
export const getCurrentuser = async(req ,res)=>{
    try{
        const userId = req.userId
        const user = await usermodel.findById(userId)
        if(!user){
            return re.status(404).json({message:"current user is not found"})
        }
        return res.status(200).json(user)
    }catch(error){
        return res.status(500).json({message:`getcurrent user error ${error}`})
    }
}