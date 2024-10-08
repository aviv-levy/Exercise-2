import { NavLink, useNavigate } from "react-router-dom";
import { removeToken, verifyToken } from "../Auth/TokenManager";
import { useContext } from "react";
import { UserDetailsContext } from "../App";

function Navbar() {

    const userContext = useContext(UserDetailsContext);
    const navigate = useNavigate();

    //Hande logout button
    function handleLogOut() {
        removeToken();
        userContext?.setUser({});
        navigate('/');
    }



    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
                <NavLink to='/' className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://www.reshot.com/preview-assets/icons/XTEWZD84MN/shopping-cart-XTEWZD84MN.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Market</span>
                </NavLink>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <NavLink to='/'
                                className="block py-2 px-3  bg-blue-700 rounded md:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/shop'
                                className="block py-2 px-3 bg-blue-700 rounded md:bg-transparent  md:p-0 md:hover:text-blue-700 dark:text-white md:dark:text-blue-500">
                                Shop
                            </NavLink>
                        </li>
                        {
                            !verifyToken() ? //if user connected show login and register
                                <>
                                    <li>
                                        <NavLink to='/login'
                                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                            Login
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/register'
                                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                            Register
                                        </NavLink>
                                    </li>
                                </>

                                : // else show Logout button and hello
                                <>

                                    {
                                        userContext?.user.isEditor.valueOf &&
                                        <NavLink to='/newProduct'
                                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                            add Product
                                        </NavLink>
                                    }

                                    <p>Hello, {userContext?.user.firstname} {userContext?.user.lastname}</p>
                                    <button
                                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        onClick={handleLogOut}>
                                        Logout
                                    </button>

                                </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;