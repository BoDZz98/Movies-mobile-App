import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";

export function setUserId() {
  const userId = FIREBASE_AUTH?.currentUser?.uid;
  return userId;
}

// add movie to fav or wishlist-------------------------------------------
export async function addMovie(movieData, isSet, list) {
  const userId = setUserId();
  const userRef = doc(FIREBASE_DB, "users", userId);
  const addedMovie = {
    id: movieData.id,
    title: movieData.title,
    rating: movieData.vote_average,
    poster: movieData.poster,
    genres: movieData.genres,
    runtime: movieData.runtime,
    release_date: movieData.release_date,
  };
  if (isSet) {
    await updateDoc(userRef, {
      [list]: arrayRemove(addedMovie),
    });
  } else {
    await updateDoc(userRef, {
      [list]: arrayUnion(addedMovie),
    });
  }
}

export async function addComment(commentData) {
  const userId = setUserId();
  
  try {
    const docRef = await setDoc(doc(FIREBASE_DB, "comments",'any2'), {
      userId,
      movieId: 'anyyyy',
      commentDesc: commentData.desc,
      rating: commentData.rating,
    });
  } catch (error) {
    console.log("in firebase services , called from AddCommentModal.js", error);
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
