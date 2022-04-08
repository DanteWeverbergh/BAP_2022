import React, { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import WorkoutCard from './WorkoutCard';

function PreviousSession({ previousSession, previous, setPrevious }) {
  const [date, setDate] = useState('');
  useEffect(() => {
    console.log(previousSession.length);
  }, []);

  return (
    <>
      <div className="bg-slate-950 z-50 h-screen w-screen transparant-10 relative flex flex-col justify-center text-white-950">
        <div className="">
          <div className="">
            <IoCloseOutline
              onClick={() => setPrevious(false)}
              className="text-3xl absolute top-12 right-12 text-white-950"
            />
          </div>

          {previousSession.length === 0 && (
            <div>
              <h1 className="mx-12 font-bold text-3xl text-center">
                Nothing in here!
              </h1>
            </div>
          )}

          {previousSession &&
            previousSession.map(({ id, data }) => (
              <>
                <WorkoutCard key={id} id={id} data={data} />

                <div className="mx-12">
                  {data.log.map((r) => (
                    <p className="mt-6 bg-slate-960 rounded-md px-4 py-2">
                      {r.exercise.map((ex) => (
                        <div>
                          <h1 className="text-xl">{ex.exName && ex.exName}</h1>
                          <div className="flex">
                            <p>{ex.reps && `${ex.reps} reps`}</p>
                            <p className="ml-6">
                              {ex.weight && `${ex.weight} kg`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </p>
                  ))}
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
}

export default PreviousSession;
