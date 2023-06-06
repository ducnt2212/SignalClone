import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD-gSgS-rsskkMG2xAN5BdQqct7f6WGHdI',
  authDomain: 'signalclone-11578.firebaseapp.com',
  projectId: 'signalclone-11578',
  storageBucket: 'signalclone-11578.appspot.com',
  messagingSenderId: '333609104467',
  appId: '1:333609104467:web:da7dda11af49be59f542a6',
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();

export {db, auth, firebase};
