import React, { useEffect, useState } from 'react';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import Modal from '../../Components/Modal';
import { useAuthContext } from '../../Context/AuthContext';
import { db } from '../../Libs/Firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { updateDoc } from '../../Libs/Firestore';

function Records({ u }) {
  const [openDeadlift, setOpenDeadlift] = useState(false);
  const [openSquat, setOpenSquad] = useState(false);
  const [openBench, setOpenBench] = useState(false);

  const [deadlift, setDeadlift] = useState('');
  const [squad, setSquad] = useState('');
  const [bench, setBench] = useState('');

  //modal
  const [openModal, setOpenModal] = useState(false);

  const { user } = useAuthContext();

  useEffect(() => {
    //
    //console.log(u.squad1rm);
    console.log(u.deadift1rm);

    const unsub = onSnapshot(doc(db, 'users', user.uid), (doc) => {
      doc.data().deadlift1rm && setDeadlift(doc.data().deadlift1rm);
      doc.data().squad1rm && setSquad(doc.data().squad1rm);
      doc.data().bench1rm && setBench(doc.data().bench1rm);
    });
  }, []);

  const updateDeadlift = (e) => {
    //
    e.preventDefault();

    updateDoc('users', user.uid, { deadlift1rm: deadlift });
  };
  const updateSquat = (e) => {
    e.preventDefault();
    //

    updateDoc('users', user.uid, { squad1rm: squad });
  };

  const updateBench = (e) => {
    e.preventDefault();
    //

    updateDoc('users', user.uid, { bench1rm: bench });
  };

  return (
    <>
      <div className="flex justify-between mx-12">
        <div
          onClick={() => setOpenDeadlift(!openDeadlift)}
          className="bg-blue-500 rounded-full h-24 w-24 flex "
        >
          <p className="m-auto">{deadlift}</p>
        </div>
        <div
          onClick={() => setOpenSquad(!openSquat)}
          className="bg-blue-500 rounded-full h-24 w-24 flex"
        >
          <p className="m-auto">{squad}</p>
        </div>
        <div
          onClick={() => setOpenBench(!openBench)}
          className="bg-blue-500 rounded-full h-24 w-24 flex"
        >
          <p className="m-auto">{bench}</p>
        </div>
      </div>
      <div className="flex justify-between mx-12 ">
        <div className="bg-blue-500  h-12 w-24 flex ">
          <p className="m-auto">Deadlift</p>
        </div>
        <div className="bg-blue-500  h-12 w-24 flex">
          <p className="m-auto">Squad</p>
        </div>
        <div className="bg-blue-500  h-12 w-24 flex">
          <p className="m-auto">Bench</p>
        </div>
      </div>
      {openDeadlift ? (
        <div>
          <form onSubmit={updateDeadlift} method="POST" className="mx-12 mb-4">
            <Input
              type={'number'}
              placeholder="deadlift 1rm"
              onChange={({ target }) => setDeadlift(target.value)}
              id="deadlift"
              value={deadlift}
              name="deadlift"
            />
            <Button text={'Update'} />
          </form>
        </div>
      ) : (
        <div></div>
      )}

      {openSquat ? (
        <div>
          <form onSubmit={updateSquat} method="POST" className="mx-12 mb-4">
            <Input
              type={'number'}
              placeholder="squad 1rm"
              onChange={({ target }) => setSquad(target.value)}
              id="squad"
              value={squad}
              name="squad"
            />
            <Button text={'Update'} />
          </form>
        </div>
      ) : (
        <div></div>
      )}

      {openBench ? (
        <div>
          <form onSubmit={updateBench} method="POST" className="mx-12 mb-4">
            <Input
              type={'number'}
              placeholder="bench 1rm"
              onChange={({ target }) => setBench(target.value)}
              id="bench"
              value={bench}
              name="bench"
            />
            <Button text={'Update'} />
          </form>
        </div>
      ) : (
        <div></div>
      )}

      {/**

      {openModal && <Modal openModal={openModal} setOpenModal={setOpenModal} />}
       */}
    </>
  );
}

export default Records;
