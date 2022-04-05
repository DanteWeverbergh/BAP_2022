import { useState } from 'react';
import { useAuthContext } from '../Context/AuthContext';
import { db, FieldValue } from './Firebase';
import { deadliftGifs } from './Gifs';

//get collection from firestore

export async function getCol(col) {
  const collection = [];

  db.collection(col).onSnapshot((snapshot) => {
    snapshot.docs.map((doc) => {
      collection.push(doc.data());
    });
  });

  return collection;
}

//get collection inside collection
export async function getColInCol(col, docId, coll) {
  const collection = [];

  db.collection(col)
    .doc(docId)
    .collection(coll)
    .onSnapshot((snapshot) => {
      snapshot.map((doc) => {
        collection.push(doc.data());
      });
    });

  return collection;
}

//get a document within a collection by id
export async function getDocById(col, doc) {
  let document = {};

  const result = db
    .collection(col)
    .doc(doc)
    .get()
    .then((doc) => {
      document = doc.data();
    });

  await result;

  return document;
}

//get a doc inside a collection in a doc

export async function getDocInDoc(col, id, coll, docId) {
  let document = {};

  db.collection(col)
    .doc(id)
    .collection(coll)
    .doc(docId)
    .get()
    .then((doc) => {
      document = doc.data();
    });

  return document;
}

//update doc

export async function updateDoc(col, doc, data) {
  try {
    await db.collection(col).doc(doc).update(data);

    alert('updated');
  } catch (error) {
    console.log(error.message);
  }
}

//add doc to collection
export async function addDoc(col, data) {
  try {
    await db.collection(col).add(data);

    alert('exercise updated');
  } catch (error) {
    console.log(error.message);
  }
}

//add routine
export async function addRoutine(data, dataa, setDocRef) {
  //

  try {
    await db
      .collection('Routines')
      .add(data)
      .then((docRef) => {
        db.collection('Routines')
          .doc(docRef.id)
          .collection('Exercises')
          .add(dataa);

        setDocRef(docRef.id);
      });

    alert('routine created');

    // go back to dashboard
  } catch (error) {
    console.log(error.message);
  }
}

//add extra day to routine
export async function addDayToRoutine(data, docRef) {
  try {
    await db
      .collection('Routines')
      .doc(docRef)
      .collection('Exercises')
      .add(data)
      .then(() => console.log('succes'));
  } catch (error) {
    console.log(error.message);
  }
}

//records updat
export async function recordsUpdate(user, lift, rm) {
  //

  try {
    await db.collection('posts').add({
      uid: user.uid,
      created: FieldValue.serverTimestamp(),
      uPhoto: user.photoURL,
      likes: [],
      text: `${user.displayName} updated his 1rm with ${rm} kg on the ${lift}`,
      photoUrl: 'https://media.giphy.com/media/3oKIPjzfv0sI2p7fDW/giphy.gif',
    });
  } catch (error) {
    console.log(error.message);
  }
}

export async function follow(followerUid, profileUid, follow, setIsFollowing) {
  if (follow) {
    //follow
    try {
      //
      await db
        .collection('users')
        .doc(followerUid)
        .update('following', FieldValue.arrayUnion(profileUid));

      await db
        .collection('users')
        .doc(profileUid)
        .update('followers', FieldValue.arrayUnion(followerUid));

      setIsFollowing(true);
    } catch (error) {
      console.log(error.message);
    }
  } else {
    //unfollow

    await db
      .collection('users')
      .doc(followerUid)
      .update('following', FieldValue.arrayRemove(profileUid));

    await db
      .collection('users')
      .doc(profileUid)
      .update('followers', FieldValue.arrayRemove(followerUid));

    setIsFollowing(false);
    try {
    } catch (error) {
      console.log(error.message);
    }
  }
}

// CHAT

// send message

export async function sendMessage(message, uid, chatId) {
  try {
    await db.collection('chat').doc(chatId).collection('messages').add({
      created: FieldValue.serverTimestamp(),
      message,
      uid,
    });

    await db.collection('chat').doc(chatId).update({
      lastUpdated: FieldValue.serverTimestamp(),
    });

    console.log('message send');
  } catch (error) {
    console.log(error.message);
  }
}

// add Contact
export async function addContact(user, uid, setIsLoaded) {
  //

  try {
    // add contact to your own connection
    await db
      .collection('users')
      .doc(user.uid)
      .update('chat', FieldValue.arrayUnion(uid));

    //add contact to other connection
    await db
      .collection('users')
      .doc(uid)
      .update('chat', FieldValue.arrayUnion(user.uid));

    //create chatroom for users
    await db.collection('chat').add({
      users: [user.uid, uid],
      created: FieldValue.serverTimestamp(),
    });

    setIsLoaded(true);
  } catch (error) {
    console.log(error.message);
  }
}

// delete contact
export async function deleteContact(user, uid, setIsLoaded) {
  try {
    await db
      .collection('users')
      .doc(user.uid)
      .update('chat', FieldValue.arrayRemove(uid));

    //add contact to other connection
    await db
      .collection('users')
      .doc(uid)
      .update('chat', FieldValue.arrayRemove(user.uid));

    setIsLoaded(true);
  } catch (error) {
    console.log(error.message);
  }
}

// CHECK duplicats
export async function checkDuplicates(col, duplicate) {
  //check for duplicates in exercises
}
