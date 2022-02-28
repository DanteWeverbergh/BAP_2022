import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layouts/Layout';
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

        <Route path={'*'} element={<Home />} />
      </Routes>
    </>
  );
}

export default Routing;
