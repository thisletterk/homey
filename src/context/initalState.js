import { fetchCart, fetchUser } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser();
const bookmarkInfo = fetchCart();

export const initialState = {
	user: userInfo,
	propertyItems: null,
	bookmarkShow: false,
	bookmarkItems: bookmarkInfo,
};
