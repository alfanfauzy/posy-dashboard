const fs = require('fs');
require('dotenv').config();

const swTemplate = `
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js',);
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js',);

const firebaseConfig = {
  apiKey: "${process.env.NEXT_PUBLIC_API_KEY}",
  authDomain: "${process.env.NEXT_PUBLIC_AUTH_DOMAIN}",
  projectId: "${process.env.NEXT_PUBLIC_PROJECT_ID}",
  storageBucket: "${process.env.NEXT_PUBLIC_STORAGE_BUCKET}",
  messagingSenderId: "${process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID}",
  appId: "${process.env.NEXT_PUBLIC_APP_ID}",
  measurementId: "${process.env.NEXT_PUBLIC_MEASUREMENT_ID}",
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);
`;

fs.writeFileSync('./public/firebase-messaging-sw.js', swTemplate);
