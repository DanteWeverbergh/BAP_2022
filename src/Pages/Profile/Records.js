import React, { useEffect, useState } from 'react';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import Modal from '../../Components/Modal';
import { useAuthContext } from '../../Context/AuthContext';
import { db } from '../../Libs/Firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { recordsUpdate, updateDoc } from '../../Libs/Firestore';
import Swal from 'sweetalert2';

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
    const unsub = onSnapshot(doc(db, 'users', user.uid), (doc) => {
      doc.data().deadlift1rm && setDeadlift(doc.data().deadlift1rm);
      doc.data().squad1rm && setSquad(doc.data().squad1rm);
      doc.data().bench1rm && setBench(doc.data().bench1rm);
    });

    return unsub;
  }, []);

  const updateDeadlift = (e) => {
    //
    e.preventDefault();

    updateDoc('users', user.uid, { deadlift1rm: deadlift });

    recordsUpdate(user, 'deadlift', deadlift);
  };
  const updateSquat = (e) => {
    e.preventDefault();
    //

    updateDoc('users', user.uid, { squad1rm: squad });

    recordsUpdate(user, 'squad', squad);
  };

  const updateBench = (e) => {
    e.preventDefault();
    //

    // udpate forebase
    //updateDoc('users', user.uid, { bench1rm: bench });

    //recordsUpdate(user, 'benchpress', bench);
  };

  const updateRm = (lift) => {
    Swal.fire({ input: 'text', text: `update ${lift}` });
  };

  return (
    <>
      <div className="flex justify-between mx-12 text-white-950">
        <div
          onClick={() => setOpenDeadlift(!openDeadlift)}
          className="bg-slate-960 rounded-full h-24 w-24 flex "
        >
          <p className="m-auto text-center">
            {deadlift} <br /> deadlift
          </p>
        </div>
        <div
          onClick={() => setOpenSquad(!openSquat)}
          className="bg-slate-960 rounded-full h-24 w-24 flex"
        >
          <p className="m-auto text-center">
            {squad} <br />
            squat
          </p>
        </div>
        <div
          onClick={() => updateRm('bench')}
          className="bg-slate-960 rounded-full h-24 w-24 flex"
        >
          <p className="m-auto text-center">
            {bench} <br /> bench
          </p>
        </div>
      </div>

      {openDeadlift ? (
        <div>
          <form
            onSubmit={updateDeadlift}
            method="POST"
            className="mx-12 mt-4 mb-4"
          >
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
        <>
          <div className="text-white-950">Bench</div>
        </>
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
