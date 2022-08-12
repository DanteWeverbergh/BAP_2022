import { query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Back from '../../Components/Back';
import Exercise from '../../Components/Exercises/Exercise';
import VideoModal from '../../Components/Exercises/VideoModal';
import Modal from '../../Components/Modal';
import { useAuthContext } from '../../Context/AuthContext';
import Footer from '../../Layouts/Footer/Footer';
import Header from '../../Layouts/Header/Header';
import { db } from '../../Libs/Firebase';
import { deleteDocument } from '../../Libs/Firestore';
import Routines from './Routines';
import DetailHeader from './Routines/Detail/DetailHeader';
import DaysCard from './Routines/Detail/DaysCard';
import Swal from 'sweetalert2';

function RoutineDetail() {
  let { id } = useParams();

  let Navigate = useNavigate();

  const [routine, setRoutine] = useState({});
  const { user } = useAuthContext();
  const [openModal, setOpenModal] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isCurrentRoutine, setIsCurrentRoutine] = useState(false);

  const [days, setDays] = useState([]);

  const [videoModal, setVideoModal] = useState(false);
  const [ytId, setYtId] = useState('');

  useEffect(() => {
    //

    try {
      db.collection('routines')
        .doc(id)
        .get()
        .then((doc) => {
          setRoutine(doc.data());
          const routineId = doc.id;

          console.log('......', doc.id);

          db.collection('users')
            .doc(user.uid)
            .get()
            .then((doc) => {
              const currentRoutineId = doc.data().currentRoutineId;
              if (routineId === currentRoutineId) {
                setIsCurrentRoutine(true);
              }
            });
        });

      db.collection('routines')
        .doc(id)
        .collection('days')
        .orderBy('day')
        .onSnapshot((snapshot) => {
          setDays(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });

      setIsLoaded(true);
    } catch (error) {
      console.log('error: ', error);
    }
  }, []);

  const selectRoutine = () => {
    //

    console.log('select this routineeeee', id);
    console.log(user.uid);

    db.collection('users')
      .doc(user.uid)
      .update({
        currentRoutineId: id,
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: `selected ${routine.name} as your current routine.`,
          color: '#F0F6FC',
          background: '#0D1017',
          iconColor: '#2EA043',
          confirmButtonColor: '#206FEB',
        });
      });
  };

  const modifyRoutine = () => {
    Navigate(`/log/modify/${id}`);
  };

  return (
    <>
      {isLoaded ? (
        <>
          <DetailHeader routine={routine} />

          {days.map(({ data, id }) => (
            <DaysCard key={id} id={id} day={data} />
          ))}

          {!isCurrentRoutine && (
            <div className="mx-12 fixed inset-x-0 bottom-0 mb-12">
              <button
                className="bg-blue-950 w-full py-2 px-4 rounded-lg text-white-950"
                onClick={() => selectRoutine()}
              >
                Select this routine
              </button>
            </div>
          )}
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );

  // return (
  //   <>
  //     <Header />

  //     {videoModal && <VideoModal setVideoModal={setVideoModal} ytId={ytId} />}

  //     {openModal && (
  //       <Modal
  //         setOpenModal={setOpenModal}
  //         routine={routine}
  //         selectRoutine={selectRoutine}
  //       />
  //     )}
  //     <Back link={'/log'} />
  //     <div className="mx-12">
  //       <div className="flex justify-between items-center mb-12">
  //         <h1 className="text-white-950">{routine.name}</h1>

  //         <div className="text-white-950 bg-blue-950 h-12 w-12 rounded-full flex items-center justify-center">
  //           {routine.days}
  //         </div>
  //       </div>

  //       {exercises &&
  //         exercises.map(({ id, exercise }) => (
  //           <Exercise
  //             key={id}
  //             id={id}
  //             exercise={exercise}
  //             setVideoModal={setVideoModal}
  //             setYtId={setYtId}
  //           />
  //         ))}

  //       <div className="">
  //         <div className="bg-blue-950 rounded-md px-2 mt-6 w-full py-2 text-center">
  //           <button className="text-white-950" onClick={() => modal()}>
  //             Select this as current routine
  //           </button>
  //         </div>

  //         {routine.creator && routine.creator === user.uid ? (
  //           <>
  //             {/**
  //             <div className="bg-green-950 rounded-md px-2 mt-6 w-full py-2 text-center flex items-center justify-center">
  //               <button
  //                 className="text-white-950 "
  //                 onClick={() => console.log('modify')}
  //               >
  //                 Modify this routine
  //               </button>
  //             </div>
  //              */}
  //             <div className="flex space-x-4 ">
  //               <div className="w-full">
  //                 <div className="bg-green-950 rounded-md px-2 mt-6  py-2 text-center flex items-center justify-center w-full">
  //                   <button
  //                     className="text-white-950 "
  //                     onClick={() => modifyRoutine()}
  //                   >
  //                     Modify this routine
  //                   </button>
  //                 </div>
  //               </div>
  //               <div className="bg-red-950 rounded-md px-2 mt-6  py-2 text-center flex items-center justify-center w-full">
  //                 <button
  //                   className="text-white-950 "
  //                   onClick={() => deleteRoutine()}
  //                 >
  //                   Delete this routine
  //                 </button>
  //               </div>
  //             </div>
  //           </>
  //         ) : (
  //           <div></div>
  //         )}
  //       </div>
  //     </div>
  //     <Footer />
  //   </>
  // );
}

export default RoutineDetail;
