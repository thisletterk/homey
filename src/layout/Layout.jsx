import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../components";
import { useAuthContext } from "../context/AuthContext";

const Layout = () => {
	const { isCurrentUser } = useAuthContext("");
	const { isName } = useAuthContext("");
	const { isImage } = useAuthContext("");
	const { isUid } = useAuthContext("");
	return (
		<div className='w-screen h-auto flex flex-col relative'>
			<Header
				isCurrentUser={isCurrentUser}
				isName={isName}
				isImage={isImage}
				isUid={isUid}
			/>
			<main className='mt-14 md:mt-20 py-4 w-full'>
				<Outlet />
			</main>
			{/* <Footer /> */}
		</div>
	);
};

export default Layout;

// return isCurrentUser ? <Outlet /> : redirect("/login");
//px-4 md:px-16
