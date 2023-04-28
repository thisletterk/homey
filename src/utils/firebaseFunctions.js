import {
	collection,
	doc,
	getDocs,
	orderBy,
	query,
	setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";

// Saving new Item
export const saveItem = async (data) => {
	await setDoc(doc(firestore, "Properties", `${Date.now()}`), data, {
		merge: true, // merge is used incase you want to add new fields in the future
	});
};

// get all propreties
export const getAllProperties = async () => {
  const items = await getDocs(
    query(collection(firestore, "Properties"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};