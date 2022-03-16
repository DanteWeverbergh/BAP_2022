import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from '../Helpers/Auth';
import Login from '../Pages/Auth/Login';
import Profile from '../Pages/Auth/Profile';
import Register from '../Pages/Auth/Register';
import Calculator from '../Pages/Calculator';
import Home from '../Pages/Social/Home';
import Log from '../Pages/Log/Log';
import Createposts from '../Pages/Posts/Createposts';
import SocialProfile from '../Components/Card/SocialProfile';
import FindTrainer from '../Pages/RegularUser/FindTrainer';

function Routing() {
  return (
    <>
      <div>
        <Routes>
          {/* Auth routes */}
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />

          <Route element={<Auth />}>
            <Route path={'/'} element={<Home />} />
            <Route path={'/calculator'} element={<Calculator />} />
            <Route path={'/log'} element={<Log />} />
            <Route path={'/profile'} element={<Profile />} />
            <Route path="/profile/:id" element={<SocialProfile />} />
            <Route path={'*'} element={<Home />} />
            <Route path="/createpost" element={<Createposts />} />

            {/** */}
            <Route path="/findtrainer" element={<FindTrainer />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default Routing;
