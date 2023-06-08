import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBYlwQB2bPhNqkYG1pRAUTOdUXSYuOANEs',
  authDomain: 'signalclone-9f256.firebaseapp.com',
  projectId: 'signalclone-9f256',
  storageBucket: 'signalclone-9f256.appspot.com',
  messagingSenderId: '60970761667',
  appId: '1:60970761667:web:d9b9c751a45835250d5176',
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
