import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import LandingPage from './pages/LandingPage/LandingPage';
import MyIdeas from './pages/MyIdeas/MyIdeas';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

function App() {
  return (
    <>
    <BrowserRouter>
       <Header/> 
        <main>
         <Routes>
         <Route exact path='/' element={<LandingPage />}/>
         <Route exact path='/login' element={<LoginPage/>}/>
         <Route exact path='/Register' element={<RegisterPage/>}/>
         <Route exact path='/myideas' element={<MyIdeas/>}/>
        </Routes>
        </main>
        <Footer/>
     </BrowserRouter>
     </>
  );
}

export default App;
