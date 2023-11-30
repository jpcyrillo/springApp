import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/';
import Footer from './components/footer/';
import LoginPage from './pages/loginPage/';
import HomePage from './pages/homePage/';

export default function App () {
    return (
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<LoginPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/home" element={<HomePage/>} />
          </Routes>
          <Footer/>
        </Router>
    );
};