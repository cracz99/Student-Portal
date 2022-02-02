import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
/*import  * as firebase from 'firebase';
import 'firbase/firestone';*
//firebase
const firebaseConfig = {
    apiKey: "AIzaSyDPKksbzMORaypQlMQD0TWuJJzKMEULIkE",
    authDomain: "studentp-be1a0.firebaseapp.com",
    projectId: "studentp-be1a0",
    storageBucket: "studentp-be1a0.appspot.com",
    messagingSenderId: "695048594920",
    appId: "1:695048594920:web:fffcca1f7a5c327a5af05d"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
*/
ReactDOM.render(<App/>,document.getElementById('root'));
