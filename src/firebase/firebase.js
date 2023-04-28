// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import {
	getFirestore,
	query,
	getDocs,
	collection,
	where,
	addDoc,
} from "firebase/firestore";
import {
	getAuth,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_ID,
	appId: import.meta.env.VITE_FIREBASE_API_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Google analytics
const analytics = getAnalytics(app);

// Initialize Firebase Google Auth provider
const provider = new GoogleAuthProvider();

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

// initialize to create database
const firestore = getFirestore(app);

///////// ----------- GOOGLE SIGN UP STARTS HERE -------------------------------//////////
const signInWithGoogle = (user) => {
	signInWithPopup(auth, provider).then(async (result) => {
		try {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			// The signed-in user info.
			const user = result.user;
			//console.log(result.user);

			// Add user to database
			// firestore defined here to the database we created/initizlized
			const q = query(
				collection(firestore, "Users"),
				where("uid", "==", user.uid),
			);
			const docs = await getDocs(q);
			if (docs.docs.length === 0) {
				await addDoc(collection(firestore, "Users"), {
					uid: user.uid,
					name: user.displayName,
					authDomain: "google",
					email: user.email,
					photo: user.photoURL,
					dateCreated: new Date(),
				});
				//console.log("user added to database");
			}
		} catch (error) {
			console.log(error);
		}
	});
};
///////// ----------- GOOGLE SIGN UP ENDS HERE ---------------------------------//////////

///////-------------------LOG OUT FUNCTION--------------------
const logoutUser = () => {
	signOut(auth);
};

// --------------------EXPORT FUNCTIONS HERE----------------------

export { auth, signInWithGoogle, logoutUser, storage, firestore };
