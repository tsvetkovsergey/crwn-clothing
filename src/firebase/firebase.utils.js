// firebase.utils.js
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACDZjuC3C25p0B4YcKDHRk6xfkbBRacAM",
  authDomain: "crwn-db-a5334.firebaseapp.com",
  projectId: "crwn-db-a5334",
  storageBucket: "crwn-db-a5334.appspot.com",
  messagingSenderId: "529547267377",
  appId: "1:529547267377:web:29a52991225dd69ab9b410",
  measurementId: "G-2QT18HXPTN",
};
firebase.initializeApp(firebaseConfig);

// Creates new or finds existing user in database
// Returns link to user in database
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // Create link to user in database
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // Get snapshot using created link
  const snapShot = await userRef.get();

  // Create new user if it is not in database
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // Connection and writing to database
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  // Each document is written to database individually
  // We want them all to group in one batch
  // So that we write all the files to database or
  // don't write anything at all (in case we loose
  // internet connection)
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    // firestore.doc() allows Firestore to set
    // id for the document automatically
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  // Fires off our batch request. Returns Promise
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// Useful when app starts
// You can check if the user is signed in
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

// Export firebase in case we want the whole library
export default firebase;
