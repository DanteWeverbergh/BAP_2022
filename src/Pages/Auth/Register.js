import React, { useEffect, useState, useContext } from 'react';
import FirebaseContext from '../../Context/Firebase';
import { Link, useNavigate } from 'react-router-dom';
import { doesUsernameExist } from '../../Services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuthContext } from '../../Context/AuthContext';
import Label from '../../Components/Label';
import Input from '../../Components/Input';

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

      navigate('/home');
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
      <div className="w-full flex flex-col justify-start mt-12 content-center h-screen">
        <div className="">
          <h1 className="text-4xl text-center text-white-950  mx-auto">
            Gains
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <div className="flex items-center justify-center">
            <img src="./images/logo.png" alt="logo" className="h-48 w-48" />
          </div>
        </div>

        <form className="ml-12 mr-12" onSubmit={handleSubmit} method="POST">
          <div className="mb-4">
            <Label label={'Email'} htmlFor={'email'} />

            <Input
              type={'email'}
              name={'email'}
              value={email}
              placeholder="johndoe@email.com"
              id="email"
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div className="mb-6">
            <Label label={'Password'} htmlFor={'password'} />

            <Input
              type={'password'}
              name={'password'}
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="password"
              id="password"
            />
          </div>

          <div className="mb-6">
            <Label label={'Username'} htmlFor={'username'} />

            <Input
              type={'text'}
              name={'userName'}
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              placeholder="username"
              id="username"
            />
          </div>

          <div className="mb-6">
            <Label label={'fullname'} htmlFor={'fullName'} />

            <Input
              type={'text'}
              name={'fullName'}
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              placeholder="John Doe"
              id="fullName"
            />
          </div>
          <div>
            <label className="text-white-950">Account type</label>
            <select
              className="rounded-md w-full h-8 bg-white-950 text-slate-950"
              value={role}
              onChange={({ target }) => setRole(target.value)}
            >
              <option>regular</option>
              <option>Personal trainer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-950 my-4 text-white-950  px-4 py-2 rounded-md"
          >
            Register
          </button>
        </form>

        <div className="mx-12 text-white-950">
          <Link to={'/login'}>Already have an account? Login</Link>
        </div>
      </div>
    </>
  );
}

export default Register;
