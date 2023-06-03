import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route , Navigate} from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import LandingPage from './pages/LandingPage/LandingPage';
import MyIdeas from './pages/MyIdeas/MyIdeas';

function App() {
  return (
    <>
    <BrowserRouter>
        <Header/> 
        <main>
         <Routes>
         <Route exact path='/' element={<LandingPage/>}/>
         <Route exact path='/myideas' element={<MyIdeas/>}/>
         <Route path='*' element={<Navigate to='/myideas'/>}/>
        </Routes>
        </main>
     </BrowserRouter>
     <Footer/>
     </>
  );
}

export default App;
