import {createSlice} from "@reduxjs/toolkit"
const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null
    },
    reducers:{
        setuserData:(state,action)=>{
            state.userData = action.payload
        },
        updateCredits:(state,action) =>{
            if(state.userData){
                state.userData.credits = action.payload
            }
        }
    }
})
export const {setuserData , updateCredits} = userSlice.actions
export default userSlice.reducer