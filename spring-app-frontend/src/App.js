import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/';
import Footer from './components/footer/';
import LoginPage from './pages/loginPage/';
import HomePage from './pages/homePage/';
import LoggedHomePage from './pages/loggedHomePage/';
import UserRegisterPage from './pages/userRegisterPage/';
import ProductRegisterPage from './pages/productRegisterPage/';

export default function App () {
    return (
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/home" element={<LoggedHomePage/>} />
            <Route path="/userRegister" element={<UserRegisterPage/>} />
            <Route path="/productRegister" element={<ProductRegisterPage/>} />
          </Routes>
          <Footer/>
        </Router>
    );
};