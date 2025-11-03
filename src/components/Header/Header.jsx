// conditioanlly render logOut button  
import {Container,Logo,LogoutBtn} from "../index";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header(){

    const authStatus = useSelector((state) => 
        state.auth.status 
    )
    const navigate = useNavigate();

    const navItems = [ // array to store navigation bar items
        {
            name : 'Home',
            slug : '/',
            active : true
        },
        {
            name : 'Login',
            slug : '/login',
            active : !authStatus // invisible if already logged in and vice-versa
        },
        {
            name : 'SignUp',
            slug : '/signup',
            active : !authStatus // invisible if already logged in and vice-versa
        },
        {
            name : 'All posts',
            slug : '/all-posts',
            active : authStatus // visible only if  logged in and vice-versa
        },
        {
            name : 'Add post',
            slug : '/add-post',
            active : authStatus // visible only if  logged in and vice-versa
        }
    ]

    return(

        <header className="py-3 shadow bg-gray-500">
        <Container>
            <nav className="flex">

                <div className="mr-4">
                    <Link to='/'>
                    <Logo width="70px"/>
                    </Link>
                </div>

                <ul className="flex ml-auto">
                    {navItems.map((item) => 

                    item.active? ( // if item is active
                        <li key={item.name}>  {/*whereever element repeats itself, a key is required to identify it*/}
                            <button onClick={() => navigate(item.slug)}
                                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                            > {/* navigate from react-router-dom we declare from useNavigate() ... it automatically navigates to required page whih=ch we give in our slug */}
                                {item.name}
                            </button>
                        </li>
                    ) : null // else dont show that anything

                     )}
                     {authStatus && ( // if authentication status == true, only then show logout button
                        <li>
                            <LogoutBtn/>
                        </li>
                     )}
                </ul>

            </nav>
        </Container>
        </header>
    );
}