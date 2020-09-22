import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAyILCAu7yp8emE_FuhRdsIR2aMs-R83Cc',
  authDomain: 'fireterest-in.firebaseapp.com',
  databaseURL: 'https://fireterest-in.firebaseio.com',
  projectId: 'fireterest-in',
  storageBucket: 'fireterest-in.appspot.com',
  messagingSenderId: '304957899868',
  appId: '1:304957899868:web:c7b92bff07f9b67c4a9299',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Get a reference to the storage service, which is used to create references in your storage bucket
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export { projectStorage, projectFirestore, timestamp };
