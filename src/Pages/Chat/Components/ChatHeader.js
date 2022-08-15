import React, { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import Back from '../../../Components/Back';
import { useAuthContext } from '../../../Context/AuthContext';
import { db } from '../../../Libs/Firebase';
import { deleteContact } from '../../../Libs/Firestore';

function ChatHeader({ contactUid }) {
  const { user } = useAuthContext();
  let Navigate = useNavigate();

  const [chatUser, setChatUser] = useState({});
  const [chatUid, setChatUid] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    //

    console.log('contact........', contactUid);

    let mounted = false;
    db.collection('users')
      .doc(contactUid)
      .get()
      .then((doc) => {
        if (!mounted) {
          setChatUser(doc.data());
        }
      });

    //setIsLoaded(true);

    return () => {
      mounted = true;
    };
  }, []);

  useEffect(() => {
    if (isDeleted) {
      Navigate('/chat');
    }
  }, [isDeleted]);

  return (
    <>
      <div className="mb-24 ">
        <div className="absolute top-0 left-0 ">
          <Back />
        </div>
        <div className="absolute top-0 right-0 ">
          <div className="flex items-center">
            <h1 className="text-white-950 text-xl font-bold">
              {chatUser.fullName}{' '}
            </h1>
            <div className="bg-blue-950 h-12 w-12 flex items-center justify-center rounded-full m-5">
              <img
                src={chatUser.photoURL}
                className="h-11 w-11 object-cover rounded-full "
                alt="profileImage"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatHeader;
