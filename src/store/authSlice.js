import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false, //status of logged in or not
    userData : null //userData like login name, password etc
}

const authSlice = createSlice({

    name : 'auth',
    initialState,
    reducers : {

        login : (state,action) => { // when a user logs in
            state.status = true; //set loggedin status to true
            state.userData = action.payload.userData; // set data to userData we can write action.payload only also
        },

        logout : (state) /*we dont need action here*/ => { // when user logs out
            state.status = false; //set loggedin status to false
            state.userData = null; // and data to null
        }
    }

})

export const {login,logout} = authSlice.actions; // directly export login logout functionality
// NOTE : the reducers like login, logout in authSlice are actually the actions , thats why we import them from authSlice.actions

export default authSlice.reducer;