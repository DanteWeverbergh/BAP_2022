import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';

function Dashboard() {
  const { user } = useAuthContext();

  useEffect(() => {
    //
  }, []);

  return (
    <>
      <div className="mx-12">
        <div className="mt-6 text-white">Dashboard</div>

        <Link to="/log/workout" className=" px-5 py-2 bg-blue-500 rounded-md">
          Log your workout
        </Link>
      </div>
    </>
  );
}

export default Dashboard;
