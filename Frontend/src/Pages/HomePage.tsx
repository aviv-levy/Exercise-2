import { Link } from "react-router-dom";

function HomePage() {
    return ( 
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-300 to-primary">
        <div className="bg-white rounded-3xl shadow-xl px-30 py-15 space-y-4">
        <div className="flex justify-center">
            <img className="dark:hidden w-40" src="https://www.reshot.com/preview-assets/icons/XTEWZD84MN/shopping-cart-XTEWZD84MN.svg" alt="Logo" />
            </div>
        <h1 className="text-center text-4xl">Market</h1>
          <Link 
            to="/shop" 
            className="block w-full px-4 py-2 text-center text-black bg-white border-2 border-black rounded-lg shadow transition duration-300 ease-in-out transform hover:bg-black hover:text-white focus:outline-none"
          >
            Shop
          </Link>
          <Link 
            to="/login" 
            className="block w-full px-4 py-2 text-center text-black bg-white border-2 border-black rounded-lg shadow transition duration-300 ease-in-out transform hover:bg-black hover:text-white focus:outline-none"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="block w-full px-4 py-2 text-center text-black bg-white border-2 border-black rounded-lg shadow transition duration-300 ease-in-out transform hover:bg-black hover:text-white focus:outline-none"
          >
            Register
          </Link>
        </div>
      </div>
     );
}

export default HomePage;