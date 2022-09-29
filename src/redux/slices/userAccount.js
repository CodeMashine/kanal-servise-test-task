import { createSlice } from '@reduxjs/toolkit' ;


// let initialState = {
//     userName : "admin" ,
//     password : "admin" ,
// } ;

let initialState = {
    userName : "admin" ,
    password : "admin" ,
} ;

export const userAccountSlice = createSlice({
  name: 'userAccount',
  initialState,
  reducers: {
    setUserData : (state , action) => {
        state.userName = action.payload[0] ;
        state.userName = action.payload[1] ;
    },
  }
})

export const { setUserData } = userAccountSlice.actions ;

export default userAccountSlice.reducer ;