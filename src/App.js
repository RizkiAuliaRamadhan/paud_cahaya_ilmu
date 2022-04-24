import React from 'react';
import Routes from './routes';
// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCVHhQ246k-LSc45PDNbALdhb30UUih6rc',
  authDomain: 'paud-cahaya-ilmu.firebaseapp.com',
  projectId: 'paud-cahaya-ilmu',
  storageBucket: 'paud-cahaya-ilmu.appspot.com',
  messagingSenderId: '1073775318659',
  appId: '1:1073775318659:web:eb2c482bf07a44f1ce2db6',
  measurementId: 'G-P1TZY4V71Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const App = () => {
  return <Routes />;
};

export default App;
