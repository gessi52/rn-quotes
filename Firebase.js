import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "xxx",
    authDomain: "xxx",
    databaseURL: "xxx",
    projectId: "xxx",
    storageBucket: "xxx",
    messagingSenderId: "xxx",
    appId: "xxx"};

    export default class Firebase {
        static db;
       
        static init () {
          firebase.initializeApp(firebaseConfig);
          Firebase.db = firebase.firestore();
          //const settings = { timestampsInSnapshots: true };
          //Firebase.db.settings(settings);
        };
      };
