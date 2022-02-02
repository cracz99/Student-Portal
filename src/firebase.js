//import firebase from 'firebase/compat/app';
//import "firebase/firestore";
import {initializeApp} from 'firebase/app';
import {getAuth} from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

  const app = initializeApp({
   /* apiKey: "AIzaSyDPKksbzMORaypQlMQD0TWuJJzKMEULIkE",
    authDomain: "studentp-be1a0.firebaseapp.com",
    projectId: "studentp-be1a0",
    storageBucket: "studentp-be1a0.appspot.com",
    messagingSenderId: "695048594920",
    appId: "1:695048594920:web:fffcca1f7a5c327a5af05d"
  */
 apiKey: "AIzaSyAlVnF66AdMOG-Z2CAFUFEIZquiUKGjbr8",
 authDomain: "studentp2-624c1.firebaseapp.com",
 projectId: "studentp2-624c1",
 storageBucket: "studentp2-624c1.appspot.com",
 messagingSenderId: "419001605761",
 appId: "1:419001605761:web:2b367ac3edb32bc4d3b780"


}); 
  export const auth=getAuth()
  export const db = getFirestore();
  export const storage = getStorage(app);
  export default app
  