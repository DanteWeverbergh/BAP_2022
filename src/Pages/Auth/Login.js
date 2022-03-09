import React, { useEffect, useState, useContext } from 'react';
import FirebaseContext from '../../Context/Firebase';
import 'firebase/auth';

import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';

function Login() {
  const { firebase } = useContext(FirebaseContext);
  let navigate = useNavigate();

  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signin } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      signin(email, password);
    }
  };

  useEffect(() => {
    document.title = 'Login - Gains';
  }, []);

  return (
    <>
      <div className="w-full ">
        <h1 className="text-4xl text-center">Gains</h1>
        {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

        <form className="ml-12 mr-12" onSubmit={handleSubmit} method="POST">
          <div className="mb-4 mt-12">
            <input
              type={'email'}
              name={'email'}
              value={email}
              placeholder="email"
              id="email"
              onChange={({ target }) => setEmail(target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <input
              type={'password'}
              name={'password'}
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <Link className="" to={'/forgot'}>
            Forgot password
          </Link>

          <button type="submit" className="bg-blue-400 px-10 py-2 w-full">
            Login
          </button>
        </form>
        <div>
          <Link to={'/register'}>No account yet? Click here!</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
