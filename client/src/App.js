import React , {useState} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import LandingPage from './pages/LandingPage/LandingPage';
import MyIdeas from './pages/MyIdeas/MyIdeas';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import CreateIdea from './pages/CreateIdea/CreateIdea';
import SingleIdea from './pages/SingleIdea/SingleIdea';

function App() {
  const [search,setSearch] = useState('');
  return (
    <>
    <BrowserRouter>
       <Header setSearch={setSearch}/> 
        <main>
         <Routes>
         <Route exact path='/' element={<LandingPage />}/>
         <Route exact path='/login' element={<LoginPage/>}/>
         <Route exact path='/Register' element={<RegisterPage/>}/>
         <Route exact path='/myideas' element={<MyIdeas search={search}/>}/>
         <Route exact path='/ideas/:id' element={<SingleIdea/>}/>
         <Route exact path='/createidea' element={<CreateIdea/>}/>
        </Routes>
        </main>
        <Footer/>
     </BrowserRouter>
     </>
  );
}

export default App;
