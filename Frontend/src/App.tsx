import { Routes, Route } from 'react-router-dom';
import 'flowbite';
import './app.css';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import HomePage from './Pages/HomePage';
import Navbar from './Components/Navbar';
import { createContext, useEffect, useState } from 'react';
import { UserContext } from './Contexts/UserContext';
import { User } from './Interfaces/User';
import ShopPage from './Pages/ShopPage';
import { verifyToken } from './Auth/TokenManager';
import { getUserDetails } from './Services/ApiService';
import NewProductPage from './Pages/NewProductPage';


export const UserDetailsContext = createContext<UserContext | null>(null);


export function App() {

  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (verifyToken()) {
      const fetchData = async () => {
        try {
          setUser(await getUserDetails());
        } catch (error) {
          console.error('Error fetching data:', error);
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