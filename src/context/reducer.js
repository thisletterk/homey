export const actionType = {
	SET_USER: "SET_USER",
	SET_PROPERTY_ITEMS: "SET_PROPERTY_ITEMS",
	SET_BOOKMARK_SHOW: "SET_BOOKMARK_SHOW",
	SET_BOOKMARK_ITEMS: "SET_BOOKMARK_ITEMS",
};

const reducer = (state, action) => {
	// console.log(action);

	switch (action.type) {
		case actionType.SET_USER:
			return {
				...state,
				user: action.user,
			};

		case actionType.SET_PROPERTY_ITEMS:
			return {
				...state,
				propertyItems: action.propertyItems,
			};

		case actionType.SET_BOOKMARK_SHOW:
			return {
				...state,
				bookmarkShow: action.bookmarkShow,
			};

		case actionType.SET_BOOKMARK_ITEMS:
			return {
				...state,
				bookmarkItems: action.bookmarkItems,
			};

		default:
			return state;
	}
};

export default reducer;
