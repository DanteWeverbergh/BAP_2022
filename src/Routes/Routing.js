import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from '../Helpers/Auth';
import Login from '../Pages/Auth/Login';
import EditProfile from '../Pages/Profile/EditProfile';
import Register from '../Pages/Auth/Register';
import Calculator from '../Pages/Calculator';
import Home from '../Pages/Social/Home';
import Log from '../Pages/Log/Log';
import Createposts from '../Pages/Posts/Createposts';
import SocialProfile from '../Components/Card/SocialProfile';
import Profile from '../Pages/Profile/Profile';
import RoutineDetail from '../Pages/Log/RoutineDetail';
import CreateRoutine from '../Pages/Log/Routines/CreateRoutine';
import Workout from '../Pages/Log/Workout/Workout';
import CreateExercise from '../Pages/PersonalTrainer/Exercises/CreateExercise';
import User from '../Pages/Profile/Social/User';
import ChatDashboard from '../Pages/Chat/ChatDashboard';
import Chat from '../Pages/Chat/Chat';

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

            {/**Profile */}
            <Route path="/profile" element={<Profile />} />
            <Route path={'/profile/edit'} element={<EditProfile />} />
            <Route path="/profile/:uid" element={<User />} />

            <Route path={'*'} element={<Home />} />

            {/*Social */}
            <Route path="/createpost" element={<Createposts />} />

            {/*Routines*/}
            <Route path="/log/:id" element={<RoutineDetail />} />
            <Route path="/create/routine" element={<CreateRoutine />} />

            <Route path="/log/workout" element={<Workout />} />

            {/*Chat */}
            <Route path="chat" element={<ChatDashboard />} />
            <Route path="chat/:uid" element={<Chat />} />

            <Route path="/exercise/create" element={<CreateExercise />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default Routing;
