import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './views/Home';
import AuthPage from './components/auth/AuthPage';
import GoogleAuth from './components/auth/GoogleAuth';
import Profile from './views/Profile';
import './App.css';


const App: React.FC = () => {

  return (
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<AuthPage />}/>
        <Route path='/auth/:token' element={<GoogleAuth />}/>
        <Route path='/setting' element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
