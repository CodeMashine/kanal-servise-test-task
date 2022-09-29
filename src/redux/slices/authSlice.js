import { createSlice } from '@reduxjs/toolkit' ;


// let initialState = "contentPage" ;
let initialState = "loginPage" ;

export const authSlice = createSlice({
  name: 'isAuth',
  initialState,
  reducers: {
    setAuth : (state , action) => {
        return action.payload ;
    },
  }
})

export const { setAuth } = authSlice.actions ;

export default authSlice.reducer ;