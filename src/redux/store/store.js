import { configureStore } from '@reduxjs/toolkit' ;
import userAccount from '../slices/userAccount';
import authSlice from '../slices/authSlice';
import contentSlice from '../slices/contentSlice';


export default configureStore({
  reducer: {
    user : userAccount ,
    isAuth : authSlice ,
    content : contentSlice ,
  }
}) 