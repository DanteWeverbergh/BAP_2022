import React from 'react';
import { FaDumbbell } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Back from '../../../../../Components/Back';

function DayHeader({ day }) {
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

          <div className=" px-12 flex items-center justify-between rounded-lg py-2 bg-blue-950 absolute w-full bottom-0">
            <div className="flex">
              <div className="bg-slate-950 w-12 h-12  rounded-full flex justify-center items-center">
                <FaDumbbell className="text-xl" />
                {/* {type.type === 'cardio' ? (
            <FaRunning className="text-xl" />
          ) : (
            <FaDumbbell className="text-xl" />
          )} */}
              </div>
              <div className="ml-4">
                <h1 className="font-bold text-xl routine__name">
                  {day.dayName}
                </h1>
                <p className="routine__description">Short description</p>
              </div>
            </div>
            <div className="text-blue-950 w-12 h-12 rounded-lg flex items-center justify-center">
              <MdKeyboardArrowRight className="text-4xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DayHeader;
