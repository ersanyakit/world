import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, onMessage } from "firebase/messaging";

// Firebase yapılandırması (Firebase konsolundan alın)
const firebaseConfig = {
  apiKey: "AIzaSyB9QENeHq5qvQIOpaHFMpaFaJvI_rr_E6A",
  authDomain: "dephone-69015.firebaseapp.com",
  projectId: "dephone-69015",
  storageBucket: "dephone-69015.firebasestorage.app",
  messagingSenderId: "238786857795",
  appId: "1:238786857795:web:d45daa618454d27b11fdf6",
  measurementId: "G-9FZ9ZDQY32"
};
// Firebase Uygulamasını Başlat
const firebaseApp = initializeApp(firebaseConfig);

// Firebase Modüllerini Başlat
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

// Bildirimleri dinleme
export const messaging = 
  typeof window !== "undefined" ? getMessaging(firebaseApp) : null;

// Tarayıcıda bildirimleri dinle
if (typeof window !== "undefined" && messaging) {
  onMessage(messaging, (payload) => {
    console.log("Message received: ", payload);
  });
}