import { boot } from 'quasar/wrappers';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyChnKQTJndSz2OsfIERoKjgQmm85KbTgxw',
  authDomain: 'craft-base-prototype.firebaseapp.com',
  projectId: 'craft-base-prototype',
  storageBucket: 'craft-base-prototype.appspot.com',
  messagingSenderId: '1018160615553',
  appId: '1:1018160615553:web:3c6446ab4bc5e5e0833d80',
  measurementId: 'G-ZLCC6SDS61',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAutstateChanget((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export default boot(({ app, router }) => {
  app.config.globalProperties.$firebase = firebase;
  app.config.globalProperties.$analytics = analytics;

  router.beforeEach(async (to, from, next) => {
    const auth = to.meta.requiresAuth;
    if (auth && !(await firebase.getCurrentUser())) {
      next();
    } else {
      next();
    }
  });
});

export { firebase, analytics };
