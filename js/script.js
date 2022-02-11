import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import {
  getFirestore,
  collection,
  getDocs,
  enableIndexedDbPersistence,
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAbZZdzAEqksS97eyREomtyR_EIfiLC7BA",
  authDomain: "pwa-test-5561e.firebaseapp.com",
  projectId: "pwa-test-5561e",
  storageBucket: "pwa-test-5561e.appspot.com",
  messagingSenderId: "818373461234",
  appId: "1:818373461234:web:b16b87328afa31b089bc6b",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, "users")

// enable offline data persistence
enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
        console.log('error, probably Multiple tabs open, persistence can only be enabled in one tab at a a time.')
      } else if (err.code == 'unimplemented') {
        console.log("The current browser does not support all of the features required to enable persistence")
      }
  });

const dataEl = document.querySelector('.user')
// real time collection data
onSnapshot(colRef, (snapshot) => {
  snapshot.docs.forEach(doc => {
    dataEl.innerHTML += doc.data().user
  })
})

// only run if browser supports service workers
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js") // register the sw
    .then((reg) => console.log("service worker is registered", reg))
    .catch((err) => console.log("service worker NOT registered", err));
}