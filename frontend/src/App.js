import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import StepForm from './Components/fundRaiserForm';
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route element={<Home/>} path='/'/>
        <Route element={<StepForm/>} path='/raiseFund'/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
