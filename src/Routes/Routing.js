import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from '../Helpers/Auth';
import Footer from '../Layouts/Footer/Footer';
import Header from '../Layouts/Header/Header';
import Layout from '../Layouts/Layout';
import ForgotPassword from '../Pages/Auth/ForgotPassword';
import Login from '../Pages/Auth/Login';
import Profile from '../Pages/Auth/Profile';
import Register from '../Pages/Auth/Register';
import Calculator from '../Pages/Calculator';
import Home from '../Pages/Home';
import Log from '../Pages/Log/Log';
import Createposts from '../Pages/Posts/Createposts';

function Routing() {
  return (
    <>
      <div>
        <Header />
        <Routes>
          {/* Auth routes */}
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/forgot'} element={<ForgotPassword />} />

          {/*<Route element={<Auth />*/}
          <Route path={'/'} element={<Home />} />
          <Route path={'/calculator'} element={<Calculator />} />
          <Route path={'/log'} element={<Log />} />
          <Route path={'/profile'} element={<Profile />} />
          <Route path={'*'} element={<Home />} />
          <Route path="/create" element={<Createposts />} />
          {/*</Route>*/}
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default Routing;
