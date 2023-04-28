import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Context = createContext();

export const AuthContext = ({ children }) => {
	const [isCurrentUser, setCurrentUser] = useState("");
	const [isName, setIsName] = useState("");
	const [isImage, setIsImage] = useState(null);
	const [isUid, setIsUid] = useState("");

	//Monitor sign in/out of user START
	const authListener = () => {
		onAuthStateChanged(auth, (user) => {
			
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = user.uid;
				const name = user.displayName;
				const photo = user.photoURL;
				// ...
				setCurrentUser(user);
				setIsName(name.split(" ")[0].toUpperCase());
				setIsImage(photo);
				setIsUid(uid);
			} else {
				// User is signed out
				// ...
				setCurrentUser("");
				setIsName("");
				setIsImage("");
				setIsUid("");
			}
		});
	};

	useEffect(() => {
		authListener();
	}, []);
	//Monitor sign in/out of user START

	return (
		<Context.Provider
			value={{
				isCurrentUser,
				setCurrentUser,
				isName,
				setIsName,
				isImage,
				setIsImage,
				isUid,
				setIsUid,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useAuthContext = () => useContext(Context);
