import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import StepForm from './Components/fundRaiserForm';
import SignUp from './Components/signUp';
import LoginPage from './Components/Login';
import UserProfile from './Components/userProfile';
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route element={<Home/>} path='/'/>
        <Route element={<StepForm/>} path='/raiseFund'/>
        <Route element={<SignUp/>} path='/signUp'/>
        <Route element={<LoginPage/>} path='/login'/>
        <Route element={<UserProfile/>} path='/myprofile'/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
