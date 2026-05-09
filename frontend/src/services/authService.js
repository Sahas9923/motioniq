// authService.js

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import {
  auth,
  db
} from "./firebase";

/* =========================
   LOGIN USER
========================= */
export const loginUser = (
  email,
  password
) => {

  return signInWithEmailAndPassword(
    auth,
    email,
    password
  );

};

/* =========================
   LOGOUT USER
========================= */
export const logoutUser =
  async () => {

    return await signOut(auth);

  };

/* =========================
   REGISTER STUDENT
========================= */
export const registerStudent =
  async (
    fullName,
    email,
    password,
    faculty,
    batch
  ) => {

    try {

      /* CREATE ACCOUNT */
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user =
        userCredential.user;

      /* USER DATA */
      const userData = {

        uid:
          user.uid,

        fullName:
          fullName,

        email:
          email,

        role:
          "STUDENT",

        faculty:
          faculty,

        batch:
          batch,

        createdAt:
          new Date(),

      };

      /* SAVE TO FIRESTORE */
      await setDoc(
        doc(
          db,
          "users",
          user.uid
        ),
        userData
      );

      return userCredential;

    } catch (err) {

      console.log(err);

      throw err;

    }

  };

/* =========================
   REGISTER LECTURER
========================= */
export const registerLecturer =
  async (
    fullName,
    email,
    password,
    faculty,
    staffId
  ) => {

    try {

      /* CREATE ACCOUNT */
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user =
        userCredential.user;

      /* USER DATA */
      const userData = {

        uid:
          user.uid,

        fullName:
          fullName,

        email:
          email,

        role:
          "LECTURER",

        faculty:
          faculty,

        staffId:
          staffId,

        createdAt:
          new Date(),

      };

      /* SAVE TO FIRESTORE */
      await setDoc(
        doc(
          db,
          "users",
          user.uid
        ),
        userData
      );

      return userCredential;

    } catch (err) {

      console.log(err);

      throw err;

    }

  };

/* =========================
   GET USER DATA
========================= */
export const getUserData =
  async (uid) => {

    try {

      const snap =
        await getDoc(
          doc(
            db,
            "users",
            uid
          )
        );

      if (
        snap.exists()
      ) {

        return snap.data();

      }

      return null;

    } catch (err) {

      console.log(err);

      return null;

    }

  };

/* =========================
   UPDATE USER
========================= */
export const updateUserData =
  async (
    uid,
    updatedData
  ) => {

    try {

      const userRef =
        doc(
          db,
          "users",
          uid
        );

      await updateDoc(
        userRef,
        updatedData
      );

    } catch (err) {

      console.log(err);

      throw err;

    }

  };