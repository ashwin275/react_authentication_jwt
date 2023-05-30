import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";



const initialState = {

    userInfo:localStorage.getItem('userInfo')?json.parse(localStorage.getItem('userInfo')):null

}


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.userInfo =  action.payload;
            localStorage.setItem('userInfo',json.stringify(action.payload))
        },

        logout:(state,action)=>{
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }

    }
});

export const {setCredentials,logout} = authSlice.actions;

export default authSlice.reducer;