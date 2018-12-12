import firebase from 'firebase'

//Initialize Firebase
var config = {
    apiKey: "AIzaSyAHg9mpK9BuTtGq7Dt-ieHyY6UvgCMsIO4",
    authDomain: "project6-5db8e.firebaseapp.com",
    databaseURL: "https://project6-5db8e.firebaseio.com",
    projectId: "project6-5db8e",
    storageBucket: "project6-5db8e.appspot.com",
    messagingSenderId: "1042109561049"
};
firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

export default firebase
