import React, { useEffect, useState, useContext } from 'react';
import FirebaseContext from '../../Context/Firebase';

function Profile() {
  const { firebase } = useContext(FirebaseContext);

  //states
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    document.title = 'Profile - Gains';
  }, []);

  const test = () => {
    const user = firebase.auth().currentUser;

    console.log(user);
  };

  return (
    <>
      <div>Update profile</div>
      <p>Email: {email}</p>

      <div>
        <label>Update profile picture</label>
        <input type={'file'}></input>
      </div>

      <button className="text-4xl" onClick={() => test()}>
        Test
      </button>
    </>
  );
}

export default Profile;
