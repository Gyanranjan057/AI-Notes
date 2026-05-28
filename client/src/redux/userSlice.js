import {createSlice} from "@reduxjs/toolkit"
const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null,
        loading:true
    },
    reducers:{
        setuserData:(state,action)=>{
            state.userData = action.payload
             state.loading = false 
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