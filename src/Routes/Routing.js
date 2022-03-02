import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../Layouts/Footer/Footer';
import Header from '../Layouts/Header/Header';
import Layout from '../Layouts/Layout';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import Calculator from '../Pages/Calculator';
import Home from '../Pages/Home';
import Log from '../Pages/Log/Log';

function Routing() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/calculator'} element={<Calculator />} />
        <Route path={'/log'} element={<Log />} />

        {/* Auth routes */}
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />

        <Route path={'*'} element={<Home />} />
      </Routes>

      <Footer />
    </>
  );
}

export default Routing;
