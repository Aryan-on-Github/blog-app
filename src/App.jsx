import './App.css'
import React,{useState,useEffect} from 'react'
import {useDispatch} from "react-redux"
import authService, { AuthService } from './appwrite/auth';
import { login,logout } from './store/authSlice';
import {Header,Footer} from "./components"
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {

  const [loading,setLoading] = useState(true); // loading while data is fetched . loading means: “Am I still checking if a user is logged in?”
  // It starts as true because when the app mounts, you don’t yet know if the user is logged in or not.

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {

    authService.currentUser()
    .then((userData) => { //get userdata from current user
      if(userData)
      {
        dispatch(login({userData})); //if data exists, then call login and set the loginStatus as true there (tell app that user is loggedIn)
      }
      else
      {
        dispatch(logout()) // if no data, then call logout and set loginStatus to false (tell app taht user is not loggedIn) 
      }
    } ) //fech current user 
    .finally( () => {setLoading(false)}) // Whether success or error, we stop “loading” and allow the UI to render.
  }
  // now we have the info of whether user is loggedIn or not
,[]);
  


  

  return !loading ? ( // if(loading == false)
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400 '>
    <div className='w-full block'>
      <Header/>
      <main>

        {/* Pass loading state and userData to all child routes */}
          <Outlet context={{ appLoading: loading, userData }} />

      </main>
      <Footer/>
    </div>
    </div>
  ) : <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <div className="w-full text-center py-20 text-white font-bold text-xl">
          Loading user data...
        </div>
      </div>
    </div>//return loading user data.. if still loading (loading == true)
}

export default App
