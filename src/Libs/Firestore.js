import { useState } from 'react';
import { useAuthContext } from '../Context/AuthContext';
import { db, FieldValue } from './Firebase';

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

        setDocRef(docRef);
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
