import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Back from '../../Components/Back';
import Input from '../../Components/Input';
import { useAuthContext } from '../../Context/AuthContext';
import FirebaseContext from '../../Context/Firebase';
import Footer from '../../Layouts/Footer/Footer';
import Header from '../../Layouts/Header/Header';
import { db, FieldValue } from '../../Libs/Firebase';

function Contact() {
  const [search, setSearch] = useState('');
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const { firebase } = useContext(FirebaseContext);

  const [people, setPeople] = useState([]);
  const [isLoaded, setIsLoaded] = useState('');

  const [addedContact, setAddedContact] = useState('');

  useEffect(() => {
    //
    db.collection('users')
      .where('uid', '!=', user.uid)
      .onSnapshot((snapshot) => {
        setPeople(snapshot.docs.map((doc) => doc.data()));

        setIsLoaded(true);
      });
  }, []);

  const addContact = (p) => {
    //
    console.log(p.uid);

    Swal.fire({
      text: `Do you want to add ${p.fullName} as a contact`,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#2EA043',
      cancelButtonColor: '#DA3633',
      background: '#0D1017',
      color: '#F0F6FC',
    }).then((result) => {
      if (result.isConfirmed) {
        const chat = { users: [user.uid, p.uid] };

        //create chat
        db.collection('chats')
          .add(chat)
          .then((docRef) => {
            // add contact
            console.log(docRef.id);

            db.collection('users')
              .doc(user.uid)
              .update(
                'contacts',
                FieldValue.arrayUnion({ chatId: docRef.id, uid: p.uid })
              );
            db.collection('users')
              .doc(p.uid)
              .update(
                'contacts',
                FieldValue.arrayUnion({ chatId: docRef.id, uid: user.uid })
              );
          })
          .then(() => {
            navigate('/chat');
          });
      }
    });
  };

  return (
    <>
      <Back />
      <div className="text-white-950 mx-12">
        <div className="flex">
          <Input
            placeholder={'search'}
            onChange={({ target }) => setSearch(target.value)}
            name="search"
            type={'text'}
            value={search}
          />
          {/* <div className="w-6"></div>
          <div
            className="text-2xl flex items-center justify-center bg-blue-950 rounded-lg h-10 w-10"
            onClick={() => console.log(people)}
          >
            <MdOutlineSearch />
          </div> */}
        </div>

        <div className="mt-12">
          {isLoaded &&
            people
              .filter((person) => {
                if (
                  person.contacts &&
                  person.contacts.some((p) => p['uid'] === user.uid)
                ) {
                  //
                } else if (search === '') {
                  return person;
                } else if (
                  !person.contacts &&
                  search !== '' &&
                  person.fullName
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase())
                ) {
                  return person;
                }
              })
              .map((p) => (
                <>
                  <div
                    className="mb-6 flex items-center"
                    onClick={() => addContact(p)}
                  >
                    {p.photoURL ? (
                      <img
                        className="h-12 w-12 rounded-full object-cover border-2 border-blue-950"
                        src={p.photoURL}
                        alt="profile"
                      />
                    ) : (
                      <img
                        className="h-12 w-12 rounded-full  border-2 border-blue-950"
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                        alt="profile"
                      />
                    )}

                    <div>
                      <h1 className="text-xl font-bold ml-4">{p.fullName}</h1>
                    </div>
                  </div>
                </>
              ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
