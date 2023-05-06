import {initializeApp} from 'firebase/app';

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
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
