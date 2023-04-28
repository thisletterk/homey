import React from "react";
import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Profile = () => {
	const { isCurrentUser, setCurrentUser } = useAuthContext("");
	const { isName, setIsName } = useAuthContext("");
	const { isUid, setIsUid } = useAuthContext("");

	if (!isCurrentUser) {
		return <Navigate replace to='/login' />;
	} else {
		return <div>Profile</div>;
	}
};

export default Profile;
