import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";
import { useSelector } from "react-redux";

export function setUserId() {
  const userId = FIREBASE_AUTH?.currentUser?.uid;

  return userId;
}

// add movie to fav or wishlist-------------------------------------------
export async function addMovie(movieId, isSet, list) {
  const userId = setUserId();
  const userRef = doc(FIREBASE_DB, "users", userId);
  if (isSet) {
    await updateDoc(userRef, {
      [list]: arrayRemove(movieId),
    });
  } else {
    await updateDoc(userRef, {
      [list]: arrayUnion(movieId),
    });
  }
}

// check whether a movie is in fav or wishlist-------------------------------------------
export async function checkMovie(movieId, list) {
  // This is function is always called when we open the app so we make sure if the user is logged in first or not , to prevent an warning
  if (!FIREBASE_AUTH.currentUser) {
    return;
  }
  const userId = setUserId();

  const docRef = doc(FIREBASE_DB, "users", userId);
  const docSnap = await getDoc(docRef);
  if (list === "fav") {
    const isFavorite = docSnap.data().favMovies.includes(movieId);
    return isFavorite;
  } else {
    const isWhislist = docSnap.data().wishlistMovies.includes(movieId);
    return isWhislist;
  }
}
