import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import StepForm from './Components/fundRaiserForm';
import SignUp from './Components/signUp';
import LoginPage from './Components/Login';
import UserProfile from './Components/userProfile';
import UserFundRaiser from './Components/userFundRaiser';
import FundRaiserDetails from './Components/fundRaiserDetails';
import FundRaiserHome from './Components/fundRaiserHome';
import UpdateFundRaiser from './Components/updateFundRaiser';
import Footer from './Components/footer';
import MedicalCrowdfundingPlatform from './Components/aboutUs';
import Reset from './Components/resetPassword';
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
        <Route element={<UserFundRaiser/>} path='/myfundraiser'/>
        <Route element={<FundRaiserDetails/>} path='/fundraiser'/>
        <Route element={<FundRaiserHome/>} path='/fr'/>
        <Route element={<UpdateFundRaiser/>} path='/update'/>
        <Route element={<MedicalCrowdfundingPlatform/>} path='/about'/>
        <Route element={<Reset/>} path='/reset-password'/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

