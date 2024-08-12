import { Routes, Route } from 'react-router-dom';
import 'flowbite';
import 'flowbite-react';
import './app.css';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import HomePage from './Pages/HomePage';
import Navbar from './Components/Navbar';
import { createContext, useEffect, useState } from 'react';
import { UserContext } from './Contexts/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User } from './Interfaces/User';
import ShopPage from './Pages/ShopPage';
import { removeToken, verifyToken } from './Auth/TokenManager';
import { getUserDetails } from './Services/ApiService';
import NewProductPage from './Pages/NewProductPage';


export const UserDetailsContext = createContext<UserContext | null>(null);


export function App() {

  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState<boolean>(true);

  //Verify if token is valid
  //If true get details of logged in user
  //Else remove expired token from local storage
  useEffect(() => {
    if (verifyToken()) {
      const fetchData = async () => {
        try {
          setUser(await getUserDetails());
        } catch (error) {
          console.error('Error fetching data:', error);
          if (error === 403) // if token expired, remove from local storage
            removeToken();
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
    else
      setLoading(false);


  }, [])

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <UserDetailsContext.Provider value={{ user, setUser }}>
        <Navbar />
        <ToastContainer position='top-center' />
        <Routes >

          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/newProduct' element={<NewProductPage />} />

        </Routes>
      </UserDetailsContext.Provider>
    </>
  )
}
export default App