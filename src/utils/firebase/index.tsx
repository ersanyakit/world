"use client";
// Import the functions you need from the SDKs you need
import { type FirebaseOptions, initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9QENeHq5qvQIOpaHFMpaFaJvI_rr_E6A",
    authDomain: "dephone-69015.firebaseapp.com",
    projectId: "dephone-69015",
    storageBucket: "dephone-69015.firebasestorage.app",
    messagingSenderId: "238786857795",
    appId: "1:238786857795:web:d45daa618454d27b11fdf6",
    measurementId: "G-9FZ9ZDQY32"
  };

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

export const messaging = () => getMessaging(firebaseapp);

export default firebaseapp;