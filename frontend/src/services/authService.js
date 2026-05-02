import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

// LOGIN
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// REGISTER
export const registerUser = async (
  email,
  password,
  role,
  faculty,
  batch,
  indexNumber,
  dob
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    email,
    role,
    faculty,
    batch: role === "STUDENT" ? batch : null,
    indexNumber: role === "STUDENT" ? indexNumber : null,
    dob,
    createdAt: new Date()
  });

  return user;
};

// GET USER DATA
export const getUserData = async (uid) => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.data();
};