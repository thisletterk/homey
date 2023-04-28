import { Routes, Route } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Layout from "./layout/Layout";
import { Homepage, Login, Signup, Faq, Profile, Upload, NotFound } from "./pages";
import { getAllProperties } from "./utils/firebaseFunctions";
import { useEffect } from "react";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
import { BookmarkContainer } from "./components";

function App() {

	const [{ propertyItems }, dispatch] = useStateValue();


	const fetchData = async () => {
		await getAllProperties().then((data) => {
			dispatch({
				type: actionType.SET_PROPERTY_ITEMS,
				propertyItems: data,
			});
			// console.log({propertyItems: data});
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<Routes>
				<Route element={<Layout />}>
					<Route index element={<Homepage />} />
					<Route path='login' element={<Login />} />
					<Route path='signup' element={<Signup />} />
					<Route path='faq' element={<Faq />} />
					<Route path='profile/:id' element={<Profile />} />
					<Route path='profile/:id/upload' element={<Upload />} />
					<Route path='profile/:id/bookmark' element={<BookmarkContainer />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
