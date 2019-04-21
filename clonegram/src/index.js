import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

firebase.initializeApp({
    apiKey: "AIzaSyBuiVtaoJw6IaFp1Q3Lsm6UHqP_9RDsmO4",
    authDomain: "clom-b6f9b.firebaseapp.com",
    databaseURL: "https://clom-b6f9b.firebaseio.com",
    projectId: "clom-b6f9b",
    storageBucket: "clom-b6f9b.appspot.com",
    messagingSenderId: "43746315366"
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
