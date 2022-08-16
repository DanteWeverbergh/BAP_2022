import React, { useEffect, useState } from 'react';
import RoutineCard from '../../../Components/log/RoutineCard';
import { useAuthContext } from '../../../Context/AuthContext';
import { db } from '../../../Libs/Firebase';

function AllRoutines() {
  const { user } = useAuthContext();

  const [routines, setRoutines] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    try {
      db.collection('routines').onSnapshot((snapshot) => {
        setRoutines(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            routine: doc.data(),
          }))
        );
      });
    } catch (error) {
      console.log(error);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (filter === 'my') {
      try {
        db.collection('routines')
          .where('uid', '==', user.uid)
          .onSnapshot((snapshot) => {
            setRoutines(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                routine: doc.data(),
              }))
            );
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        db.collection('routines').onSnapshot((snapshot) => {
          setRoutines(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              routine: doc.data(),
            }))
          );
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [filter]);

  return (
    <>
      <div className="mx-12 text-white-950 mt-12">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold  ">
            {filter === 'all' ? 'All Routines' : 'My Routines'}
          </h1>
          <div>
            <select
              onChange={({ target }) => setFilter(target.value)}
              value={filter}
              className="bg-white-950 border-none shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={'all'}>All routines</option>
              <option value={'my'}>My routines</option>
            </select>
          </div>
        </div>
        {isLoaded &&
          routines.map(({ routine, id }) => (
            <RoutineCard key={id} id={id} routine={routine} />
          ))}
      </div>
    </>
  );
}

export default AllRoutines;
