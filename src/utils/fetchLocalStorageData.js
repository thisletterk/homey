export const fetchUser = () => {
	const userInfo =
		localStorage.getItem("user") !== "undefined"
			? JSON.parse(localStorage.getItem("user"))
			: localStorage.clear();

	return userInfo;
};

export const fetchCart = () => {
	const bookmarkInfo =
		localStorage.getItem("bookmarkItems") !== "undefined"
			? JSON.parse(localStorage.getItem("bookmarkItems"))
			: localStorage.clear();

	return bookmarkInfo ? bookmarkInfo : [];
};
