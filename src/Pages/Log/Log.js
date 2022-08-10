import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../Components/Input';
import Timer from '../../Components/Timer';
import { useAuthContext } from '../../Context/AuthContext';
import Footer from '../../Layouts/Footer/Footer';
import Header from '../../Layouts/Header/Header';
import { db } from '../../Libs/Firebase';
import { getDocById } from '../../Libs/Firestore';
import Dashboard from './Dashboard';
import Routines from './Routines';
import Workouts from './Workouts';

function Log() {
  const { user } = useAuthContext();

  const [userType, setUserType] = useState('regular');
  const [u, setU] = useState({});

  const [dashboard, setDashboard] = useState(true);
  const [routine, setRoutine] = useState(false);
  const [workouts, setWorkouts] = useState(false);

  useEffect(() => {
    let isMounted = true;
    document.title = 'Log - Gains';

    //const doc = getDocById('users', user.uid);
    //console.log(doc);
    db.collection('users')
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (isMounted) setU(doc.data());
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const clickDashboard = () => {
    setDashboard(true);
    setRoutine(false);
    setWorkouts(false);
  };

  const clickPlans = () => {
    setDashboard(false);
    setRoutine(true);
    setWorkouts(false);
  };

  const clickWorkouts = () => {
    setDashboard(false);
    setRoutine(false);
    setWorkouts(true);
  };

  return (
    <>
      <Header />

      <div>
        <ul
          className="text-white-950 flex justify-between mx-12  
         rounded-lg"
        >
          <li
            className={
              dashboard ? 'bg-blue-950 px-4 py-2 rounded-lg' : 'px-4 py-2'
            }
            onClick={() => clickDashboard()}
          >
            Dashboard
          </li>
          <li
            className={
              routine ? 'bg-blue-950 px-4 py-2 rounded-lg' : 'px-4 py-2'
            }
            onClick={() => clickPlans()}
          >
            Routines
          </li>
          <li
            className={
              workouts ? 'bg-blue-950 px-4 py-2 rounded-lg' : 'px-4 py-2'
            }
            onClick={() => clickWorkouts()}
          >
            Workouts
          </li>
        </ul>
      </div>

      {/*
      
      u.userType === 'regular' ? (
        <ul className="bg-slate-960 rounded-md py-2 mx-12 flex items-center justify-between px-8">
          <li
            className={
              dashboard ? 'text-white-950 bg-blue-950 p-2  rounded-md' : ''
            }
            onClick={() => clickDashboard()}
          >
            Dashboard
          </li>
          <li
            className={
              routine ? 'text-white-950  bg-blue-950 p-2  rounded-md' : ''
            }
            onClick={() => clickPlans()}
          >
            routines
          </li>
          <li
            className={
              workouts ? 'text-white-950  bg-blue-950 p-2  rounded-md' : ''
            }
            onClick={() => clickWorkouts()}
          >
            workouts
          </li>
        </ul>
      ) : (
        <>
          <div>make workout programs</div>
          <Link to={'/exercise/create'}>Add Exercise</Link>
        </>
      )
  
      */}

      {dashboard ? <Dashboard /> : <div></div>}
      {routine ? <Routines u={u} /> : <div></div>}
      {workouts ? <Workouts /> : <div></div>}

      <Footer />
    </>
  );
}
export default Log;
