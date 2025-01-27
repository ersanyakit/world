// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyB9QENeHq5qvQIOpaHFMpaFaJvI_rr_E6A",
  authDomain: "dephone-69015.firebaseapp.com",
  projectId: "dephone-69015",
  storageBucket: "dephone-69015.firebasestorage.app",
  messagingSenderId: "238786857795",
  appId: "1:238786857795:web:d45daa618454d27b11fdf6",
  measurementId: "G-9FZ9ZDQY32"
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './logo.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});