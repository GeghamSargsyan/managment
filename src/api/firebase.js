import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDU-sObdxTsyVbhtn0rPFbZ7Unf2eZK_SM",
  authDomain: "freightmanagment777.firebaseapp.com",
  databaseURL: "https://freightmanagment777.firebaseio.com",
  projectId: "freightmanagment777",
  storageBucket: "freightmanagment777.appspot.com",
  messagingSenderId: "1043132264536",
  appId: "1:1043132264536:web:e32142859a1f8cc58eda2d",
  measurementId: "G-DHH4XL1GXF"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
