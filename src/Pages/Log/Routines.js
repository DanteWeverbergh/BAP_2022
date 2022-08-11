import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FirebaseContext from '../../Context/Firebase';
import { db } from '../../Libs/Firebase';

import { BsFillPlusCircleFill } from 'react-icons/bs';
import { IoFilterOutline } from 'react-icons/io5';
import Filter from './Filter';
import { useAuthContext } from '../../Context/AuthContext';
import Input from '../../Components/Input';
import Label from '../../Components/Label';
import RoutineCard from '../../Components/log/RoutineCard';
import AllRoutines from './Routines/AllRoutines';
import CurrentRoutine from './Routines/CurrentRoutine';

function Routines({ u }) {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useAuthContext();

  const [isLoaded, setIsLoaded] = useState(false);
  const [routines, setRoutines] = useState([]);
  const [myRoutines, setMyRoutines] = useState([]);
  const [currentRoutine, setCurrentRoutine] = useState({});

  const [filterMenu, setFilterMenu] = useState(false);

  //filter states
  const [days, setDays] = useState('');
  const [routineName, setRoutineName] = useState('');

  //search

  useEffect(() => {
    //

    let mounted = false;

    db.collection('routines').onSnapshot((snapshot) => {
      if (!mounted) {
        setRoutines(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            routine: doc.data(),
          }))
        );
      }
    });

    return () => {
      mounted = true;
    };
  }, []);

  const removeFilters = () => {
    setRoutineName('');
    setDays('');
  };

  return (
    <>
      <CurrentRoutine />
      <AllRoutines />
    </>
  );
}

export default Routines;
