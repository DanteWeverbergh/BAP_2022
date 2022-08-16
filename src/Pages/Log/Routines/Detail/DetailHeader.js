import React, { useEffect } from 'react';
import { FaDumbbell } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import Back from '../../../../Components/Back';
import { useAuthContext } from '../../../../Context/AuthContext';
import { db } from '../../../../Libs/Firebase';

function DetailHeader({ routine }) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  let { id } = useParams();
  useEffect(() => {
    console.log();
  }, []);

  const deleteRoutine = () => {
    db.collection('routines')
      .doc(id)
      .delete()
      .then(() => {
        navigate(-1);
      });
  };

  return (
    <>
      <div className="text-white-950">
        <div className="relative">
          <img
            className="rounded-lg w-full object-cover h-6' grayscale "
            src="https://images.unsplash.com/photo-1623874514711-0f321325f318?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
            alt="routine_img"
          />

          <div className="absolute top-0 ">
            <Back />
          </div>

          <div className=" px-12 flex items-center justify-between rounded-lg py-2 bg-blue-950 absolute w-full bottom-0 ">
            <div className="flex">
              <div className="bg-slate-950 w-12 h-12  rounded-full flex justify-center items-center">
                <FaDumbbell className="text-xl" />
              </div>
              <div className="ml-4">
                <h1 className="font-bold text-xl routine__name">
                  {routine.name}
                </h1>
                <p className="routine__description">
                  {routine.shortDescription}
                </p>
              </div>
            </div>
            {user.uid === routine.uid && (
              <div
                className="text-white-950  rounded-lg bg-red-950 px-4 py-2 flex items-center justify-center"
                onClick={() => deleteRoutine()}
              >
                Delete
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailHeader;
