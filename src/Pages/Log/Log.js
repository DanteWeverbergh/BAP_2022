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
    document.title = 'Log - Gains';

    //const doc = getDocById('users', user.uid);
    //console.log(doc);
    db.collection('users')
      .doc(user.uid)
      .get()
      .then((doc) => {
        setU(doc.data());
      });
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

      {u.userType === 'regular' ? (
        <ul className="bg-slate-960 rounded-md mx-12 flex justify-between px-8">
          <li
            className={dashboard ? 'text-white-950' : ''}
            onClick={() => clickDashboard()}
          >
            Dashboard
          </li>
          <li
            className={routine ? 'text-white-950' : ''}
            onClick={() => clickPlans()}
          >
            routines
          </li>
          <li
            className={workouts ? 'text-white-950' : ''}
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
      )}

      {dashboard ? <Dashboard /> : <div></div>}
      {routine ? <Routines u={u} /> : <div></div>}
      {workouts ? <Workouts /> : <div></div>}

      <Footer />
    </>
  );
}
export default Log;
