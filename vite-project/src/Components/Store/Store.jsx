import {configureStore} from '@reduxjs/toolkit';
import authreducer from '../slice/authSlice';


const store = configureStore({
    reducer:{
        auth:authreducer
    }
})



export default store;