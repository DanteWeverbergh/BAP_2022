import React, { useEffect, useState, useContext } from 'react';
import FirebaseContext from '../../Context/Firebase';
import 'firebase/auth';

import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';
import Button from '../../Components/Button';
import Input from '../../Components/Input';

function Login() {
  const { firebase } = useContext(FirebaseContext);
  let navigate = useNavigate();

  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signin, forgotPassword } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      signin(email, password);
    }
  };

  const forgot = () => {
    //
    if (email) {
      forgotPassword(email);
      alert('recovery email sended');
    } else {
      alert('please fill in email to recover password');
    }
  };

  useEffect(() => {
    document.title = 'Login - Gains';
  }, []);

  return (
    <>
      <div className="w-full flex flex-col justify-start mt-32 content-center h-screen relative">
        <div className="">
          <h1 className="text-4xl text-center text-white-950  mx-auto">
            Gains
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <div className="flex items-center justify-center">
            <img src="./images/logo.png" alt="logo" className="h-48 w-48" />
          </div>
        </div>

        <form className="mx-12" onSubmit={handleSubmit} method="POST">
          <div className="mb-4 mt-12">
            <Input
              type={'email'}
              name={'email'}
              value={email}
              placeholder="email"
              id="email"
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div className="mb-6">
            <Input
              type={'password'}
              name={'password'}
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="password"
              id="password"
            />
          </div>

          <button className="text-white-950 mb-4" onClick={() => forgot()}>
            Forgot password
          </button>

          <button
            type="submit"
            className="w-full bg-blue-950 text-white-950 mb-4 px-4 py-2 rounded-md"
          >
            Login
          </button>
        </form>
        <div className="mx-12">
          <Link className="text-white-950" to={'/register'}>
            No account yet? Click here!
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
