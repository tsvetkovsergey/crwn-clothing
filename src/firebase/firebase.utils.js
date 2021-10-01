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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  console.log("UID: " + userAuth.uid);

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

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// Export firebase in case we want the whole library
export default firebase;
