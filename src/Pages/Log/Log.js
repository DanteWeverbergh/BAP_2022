import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../Components/Input';
import Timer from '../../Components/Timer';
import { useAuthContext } from '../../Context/AuthContext';
import Footer from '../../Layouts/Footer/Footer';
import Header from '../../Layouts/Header/Header';
import { db } from '../../Libs/Firebase';
import { getDocById } from '../../Libs/Firestore';

function Log() {
  const { user } = useAuthContext();

  const [userType, setUserType] = useState('regular');
  const [u, setU] = useState({});

  const [pt, setPt] = useState(false);
  const [workout, setWorkout] = useState(false);

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

  const clickPt = () => {
    pt(true);
    workout(false);
  };

  const clickWorkout = () => {
    pt(false);
    workout(true);
  };

  return (
    <>
      <Header />

      {/**<h1>Log your workout</h1>

      <Timer />
       */}

      {/** TIJDELIJK
       * Geen internet connectie
       */}

      {/*
      u.userType === 'regular' ? (
        <Link className="mx-12 text-white" to={'/findtrainer'}>
          Find a personal trainer
        </Link>
      ) : (
        <div>personal trainer</div>
      )
    
      */}

      <div
        className={'bg-slate-700 rounded-md mx-12 flex justify-between px-8'}
      >
        <div onClick={() => clickPt()} className={pt ? 'text-white' : ''}>
          Personal trainer
        </div>

        <div
          onClick={() => clickWorkout()}
          className={workout ? 'text-white' : ''}
        >
          Workout
        </div>
      </div>

      <Footer />
    </>
  );
}
export default Log;
