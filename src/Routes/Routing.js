import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from '../Helpers/Auth';
import Footer from '../Layouts/Footer/Footer';
import Header from '../Layouts/Header/Header';
import Layout from '../Layouts/Layout';
import Login from '../Pages/Auth/Login';
import Profile from '../Pages/Auth/Profile';
import Register from '../Pages/Auth/Register';
import Calculator from '../Pages/Calculator';
import Home from '../Pages/Home';
import Log from '../Pages/Log/Log';

function Routing() {
  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/calculator'} element={<Calculator />} />
          <Route path={'/log'} element={<Log />} />
          <Route path={'/profile'} element={<Profile />} />
          <Route path={'*'} element={<Home />} />

          {/* Auth routes */}
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default Routing;
