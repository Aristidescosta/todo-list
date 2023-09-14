import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCqF4T5Z8rfBlNH5f8BT8mlLRS0bU-2bwg",
  authDomain: "taskmanager-ef53e.firebaseapp.com",
  projectId: "taskmanager-ef53e",
  storageBucket: "taskmanager-ef53e.appspot.com",
  messagingSenderId: "243230308979",
  appId: "1:243230308979:web:71de2a188e18a5078fc806",
};

const APP = initializeApp(firebaseConfig);
export const DB = getFirestore(APP);
