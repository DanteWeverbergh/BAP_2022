import { data } from 'autoprefixer';
import React, { useEffect, useState, useContext } from 'react';
import FirebaseContext from '../../Context/Firebase';

function Login() {
  const { firebase } = useContext(FirebaseContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Login');
  };

  useEffect(() => {
    document.title = 'Login - Gains';
  }, []);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type={'email'}
              name={'email'}
              value={data.email}
              placeholder="email"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type={'password'}
              name={'password'}
              value={data.email}
              placeholder="password"
            />
          </div>
          <div>
            <button>Login</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
