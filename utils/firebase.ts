// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyCIRFsH13VK0J1h-43HOsAWg9jYHAGhROU',
    authDomain: 'fir-auth-a052d.firebaseapp.com',
    projectId: 'fir-auth-a052d',
    storageBucket: 'fir-auth-a052d.appspot.com',
    messagingSenderId: '982325579777',
    appId: '1:982325579777:web:ac19d0d556b18b2833f000',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signUpUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

const signInUser = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const signOutUser = () => {
    auth.signOut();
};

export { auth, signUpUser, signInUser, signOutUser };
