// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { collection } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAXyMiD2E7HCTW9_JhN3rVXD1BrgP_9Aw8',
	authDomain: 'fbase-firestore-react.firebaseapp.com',
	projectId: 'fbase-firestore-react',
	storageBucket: 'fbase-firestore-react.appspot.com',
	messagingSenderId: '658027236873',
	appId: '1:658027236873:web:33d481a002bedab53af2d8'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const usersCollectionReference = collection(db, 'users');
