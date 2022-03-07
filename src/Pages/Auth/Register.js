import React, { useEffect, useState, useContext } from 'react';
import FirebaseContext from '../../Context/Firebase';
import { Link, useNavigate } from 'react-router-dom';
import { doesUsernameExist } from '../../Services/firebase';

function Register() {
  const { firebase } = useContext(FirebaseContext);

  //react States
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameExist = await doesUsernameExist(username);
    if (usernameExist) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
      } catch (error) {}
    }
  };

  useEffect(() => {
    document.title = 'Register - Gains';
  }, []);

  return (
    <>
      <div className="w-full">
        <form className="ml-12 mr-12" onSubmit={handleSubmit} method="POST">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              UserName
            </label>
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullName"
            >
              Fullname
            </label>
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

          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            Sign up
          </button>
        </form>
        <div>
          <Link to={'/login'}>Already have an account? Login</Link>
        </div>
      </div>
    </>
  );
}

export default Register;
