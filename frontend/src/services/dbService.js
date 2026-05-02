import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "./firebase";

const db = getFirestore(app);

// Example: Add data
export const addStudent = async (data) => {
  try {
    await addDoc(collection(db, "students"), data);
  } catch (error) {
    console.error(error);
  }
};