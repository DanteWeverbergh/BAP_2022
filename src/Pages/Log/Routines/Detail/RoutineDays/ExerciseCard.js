import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Swal from 'sweetalert2';

function ExerciseCard({ id, data }) {
  return (
    <>
      <div
        className="text-white-950 mx-12 mt-6 flex justify-between items-center"
        onClick={() =>
          Swal.fire({
            title: data.exerciseName,
            confirmButtonText: 'OK',
            confirmButtonColor: '#206FEB',
            color: '#F0F6FC',
            background: '#0D1017',
          })
        }
      >
        <div className="flex items-center">
          <div className="bg-blue-950 w-12 h-12 rounded-full flex items-center justify-center text-white-950 font-bold text-xl">
            {data.exercise}
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-bold">{data.exerciseName}</h1>
            <div className="flex">
              <div>sets: 6</div>
              <div className="ml-4">reps: 10 - 12</div>
            </div>
          </div>
        </div>
        <div className="text-blue-950 w-12 h-12 rounded-lg flex items-center justify-center">
          <MdKeyboardArrowRight className="text-4xl" />
        </div>
      </div>
    </>
  );
}

export default ExerciseCard;
