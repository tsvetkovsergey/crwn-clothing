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

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// Export firebase in case we want the whole library
export default firebase;
