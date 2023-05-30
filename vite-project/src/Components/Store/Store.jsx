import {configureStore} from '@reduxjs/toolkit';
import authreducer from '../slice/authSlice';


const store = configureStore({
    reducer:{
        auth:authreducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware(),
    devTools : true
})



export default store;