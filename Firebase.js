import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDOVcKCKkDaXoQI7KDPFEfswfolcDrIkFY",
    authDomain: "quotes-4ea75.firebaseapp.com",
    databaseURL: "https://quotes-4ea75.firebaseio.com",
    projectId: "quotes-4ea75",
    storageBucket: "quotes-4ea75.appspot.com",
    messagingSenderId: "234480386439",
    appId: "1:234480386439:web:f5a0a59542e28e85"};

    export default class Firebase {
        static db;
       
        static init () {
          firebase.initializeApp(firebaseConfig);
          Firebase.db = firebase.firestore();
          //const settings = { timestampsInSnapshots: true };
          //Firebase.db.settings(settings);
        };
      };