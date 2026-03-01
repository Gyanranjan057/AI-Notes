import axios from "axios"
import {serverurl} from "../App"
import { setuserData } from "../redux/userSlice";
export const getCurrentuser = async(dispatch)=>{
    try{
        const result = await axios.get(serverurl + "/api/user/currentuser", {withCredentials:true})
        // console.log(result.data);
        dispatch(setuserData(result.data))
    }catch(error){
          console.log(error);
        //   dispatch(setuserData(null))
    }
}