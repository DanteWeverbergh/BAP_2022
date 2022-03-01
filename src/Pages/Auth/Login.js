import React, { useEffect, useState, useContext } from 'react';
import FirebaseContext from '../../Context/Firebase';

function Login() {
  const { firebase } = useContext(FirebaseContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Login - Gains';
  }, []);

  return (
    <>
      <div>Login page</div>
    </>
  );
}

export default Login;
