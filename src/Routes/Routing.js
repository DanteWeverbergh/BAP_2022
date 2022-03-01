import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layouts/Layout';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import Calculator from '../Pages/Calculator';
import Home from '../Pages/Home';
import Log from '../Pages/Log/Log';

function Routing() {
  return (
    <>
      <Layout />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/calculator'} element={<Calculator />} />
        <Route path={'/log'} element={<Log />} />

        {/* Auth routes */}
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />

        <Route path={'*'} element={<Home />} />
      </Routes>
    </>
  );
}

export default Routing;
