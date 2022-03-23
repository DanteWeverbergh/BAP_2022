import React, { useEffect, useState } from 'react';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import Modal from '../../Components/Modal';
import { useAuthContext } from '../../Context/AuthContext';
import { db } from '../../Libs/Firebase';

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
  }, []);

  const updateDeadlift = (e) => {
    //
    e.preventDefault();

    db.collection('users').doc(user.uid).update({
      deadlift1rm: deadlift,
    });
  };
  const updateSquat = (e) => {
    e.preventDefault();
    //

    db.collection('users').doc(user.uid).update({
      squat1rm: squad,
    });
  };

  const updateBench = (e) => {
    e.preventDefault();
    //

    db.collection('users').doc(user.uid).update({
      bench1rm: bench,
    });
  };

  return (
    <>
      <div className="flex justify-between mx-12">
        <div
          onClick={() => setOpenDeadlift(!openDeadlift)}
          className="bg-blue-500 rounded-full h-24 w-24 flex "
        >
          <p className="m-auto">{u.deadlift1rm}</p>
        </div>
        <div
          onClick={() => setOpenSquad(!openSquat)}
          className="bg-blue-500 rounded-full h-24 w-24 flex"
        >
          <p className="m-auto">{u.squad1rm}</p>
        </div>
        <div
          onClick={() => setOpenModal(true)}
          className="bg-blue-500 rounded-full h-24 w-24 flex"
        >
          <p className="m-auto">{u.bench1rm}</p>
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
          <form onSubmit={updateDeadlift} method="POST" className="mx-12">
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
      {openSquat ? <div>squat</div> : <div></div>}
      {openBench ? <div>bench</div> : <div></div>}

      {/**

      {openModal && <Modal openModal={openModal} setOpenModal={setOpenModal} />}
       */}
    </>
  );
}

export default Records;
