import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'; // authService is object that provides access to logout function inside it
import { logout } from '../../store/authSlice'; // logout from our reducer/slice to update logout state in store


function LogoutBtn () {

    const dispatch = useDispatch();
    
    const logoutHandler = () => {
        // as logOut uses async await, it is a promise
        authService.logOut()
        .then(() => {dispatch(logout())});
    }

    return(

      <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
      onClick={logoutHandler}>
        Logout</button>

    );
}

export default LogoutBtn;