import firebase from 'firebase'
require("@firebase/firestore")


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyB1HVlWTrkp99jUTsIhtfFIKgolrAyxkMA",
  authDomain: "storyhub-7aecb.firebaseapp.com",
  databaseURL: "https://storyhub-7aecb.firebaseio.com",
  projectId: "storyhub-7aecb",
  storageBucket: "storyhub-7aecb.appspot.com",
  messagingSenderId: "197658017221",
  appId: "1:197658017221:web:29606cba81ca75f70c9fac",
  measurementId: "G-R2SEHFE2DW"
};




// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default  firebase.firestore()