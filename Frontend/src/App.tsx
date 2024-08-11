import { Routes, Route } from 'react-router-dom';
import 'flowbite';
import './app.css';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import HomePage from './Pages/HomePage';
import Navbar from './Components/Navbar';

export function App() {

  return (
    <>
    <Navbar/>
    
      <Routes >

        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

      </Routes>
    </>
  )
}
export default App