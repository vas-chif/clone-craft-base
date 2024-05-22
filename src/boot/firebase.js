import { boot } from 'quasar/wrappers';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyChnKQTJndSz2OsfIERoKjgQmm85KbTgxw',
  authDomain: 'craft-base-prototype.firebaseapp.com',
  databaseURL:
    'https://craft-base-prototype-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'craft-base-prototype',
  storageBucket: 'craft-base-prototype.appspot.com',
  messagingSenderId: '1018160615553',
  appId: '1:1018160615553:web:3c6446ab4bc5e5e0833d80',
  measurementId: 'G-ZLCC6SDS61',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const analytics = getAnalytics(firebase);
const provider = new GoogleAuthProvider();

firebase.getCurrentUser = () => {
  /* restituisce una Promise che viene risolta con l'utente attualmente autenticato quando la sua autenticazione cambia.*/
  return new Promise((resolve, reject) => {
    /*Promise, viene utilizzata la funzione firebase.auth().onAuthStateChanged() per ascoltare/listener i cambiamenti di stato dell'autenticazione.
     Questa funzione viene chiamata ogni volta che lo stato dell'autenticazione dell'utente cambia. */
    const unsubscribe = onAuthStateChanged((user) => {
      /*Una volta che viene rilevato un cambiamento di stato, l'utente viene risolto dalla Promise e restituito. */
      unsubscribe(); // Rimuove il listener
      resolve(user); // Risolve la Promise con l'utente corrente
    }, reject); // Gestisce eventuali errori durante la Promise
  });
};

export default boot(({ app, router }) => {
  /*Registro le proprietà globali nell'istanza di Vue,
   rendendo firebase, analytics e auth accessibili in tutti i
   componenti dell'applicazione Vue senza doverli importare ogni volta.
   Questo è utile per semplificare l'accesso a queste istanze in tutta l'applicazione. */
  app.config.globalProperties.$firebase = firebase;
  app.config.globalProperties.$analytics = analytics;
  app.config.globalProperties.$auth = auth;
  app.config.globalProperties.$provider = provider;

  router.beforeEach(async (to, from, next) => {
    const auth = to.meta.requiresAuth;
    if (auth && !(await firebase.getCurrentUser())) {
      next();
    } else {
      next();
    }
  });
});

export { firebase, analytics, auth, provider };
