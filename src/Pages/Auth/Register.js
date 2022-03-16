import React, { useEffect, useState, useContext } from 'react';
import FirebaseContext from '../../Context/Firebase';
import { Link, useNavigate } from 'react-router-dom';
import { doesUsernameExist } from '../../Services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuthContext } from '../../Context/AuthContext';
import Label from '../../Components/Label';

function Register() {
  const { firebase } = useContext(FirebaseContext);
  let navigate = useNavigate();

  //react States
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('regular');

  const { register } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && username && password && fullName) {
      register(email, username, password, fullName, role);
    }
  };

  const test = () => {
    console.log(role);
  };

  useEffect(() => {
    document.title = 'Register - Gains';
  }, []);

  return (
    <>
      <div className="w-full">
        {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

        <form className="ml-12 mr-12" onSubmit={handleSubmit} method="POST">
          <div className="mb-4">
            <Label label={'Email'} htmlFor={'email'} />
            <input
              type={'email'}
              name={'email'}
              value={email}
              placeholder="johndoe@email.com"
              id="email"
              onChange={({ target }) => setEmail(target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <Label label={'Password'} htmlFor={'password'} />
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

          <div className="mb-6">
            <Label label={'Username'} htmlFor={'username'} />
            <input
              type={'text'}
              name={'userName'}
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              placeholder="username"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <Label label={'fullname'} htmlFor={'fullName'} />

            <input
              type={'text'}
              name={'fullName'}
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              placeholder="password"
              id="fullName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="text-white">Account type</label>
            <select
              className="rounded-md"
              value={role}
              onChange={({ target }) => setRole(target.value)}
            >
              <option>regular</option>
              <option>Personal trainer</option>
            </select>
          </div>

          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            Sign up
          </button>
        </form>

        <div className="mx-12 text-white">
          <Link to={'/login'}>Already have an account? Login</Link>
        </div>
      </div>
    </>
  );
}

export default Register;
