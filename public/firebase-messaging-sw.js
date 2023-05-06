/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js")
// importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-auth-compat.js")


// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyASgM9FGp-RNNdpW2azzyIHVNEth8LrY3g',
	authDomain: 'posy-fnb-staging.firebaseapp.com',
	projectId: 'posy-fnb-staging',
	storageBucket: 'posy-fnb-staging.appspot.com',
	messagingSenderId: '408454494774',
	appId: '1:408454494774:web:5e6a6cd83b335f0cf6f697',
	measurementId: 'G-KSJER3D771',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);
// messaging.onBackgroundMessage(payload => {
//     console.log("you received a message when you haven't the app active");
//     console.log(payload)

//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//         icon: "/logo192.png"
//     }


//     //added for auth for writing to database that message was delivered
//     /*  const singUpAnonymously= ()=>{
//         firebase.auth(app).signInAnonymously().then(user=> console.log("us"+firebase.auth().currentUser.uid));
//       }
// singUpAnonymously();*/

//     return self.registration.showNotification(
//         notificationTitle,
//         notificationOptions
//     )
// })