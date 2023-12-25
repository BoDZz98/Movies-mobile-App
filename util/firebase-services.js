import {
  Firestore,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";

export const baseImageURL = "http://image.tmdb.org/t/p/original";

export function setUserId() {
  const userId = FIREBASE_AUTH?.currentUser?.uid;
  return userId;
}

// add movie to fav or wishlist--------------------------------------------------------------------------------------
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

// add comment-------------------------------------------------------------------------------------------------
export async function addComment(commentId, commentData, movieData) {
  const userId = setUserId();

  try {
    const docRef = await setDoc(
      doc(FIREBASE_DB, "comments", commentId.toString()),
      {
        userId,
        title: movieData?.title,
        poster: movieData?.poster,
        desc: commentData.desc,
        rating: commentData.rating,
      }
    );
  } catch (error) {
    console.log("in firebase services , called from AddCommentModal.js", error);
  }
}

// Update comment -----------------------------------------------------------------------------------------------------------
export async function updateComment(commentId, commentData) {
  try {
    const commentRef = doc(FIREBASE_DB, "comments", commentId.toString());
    await updateDoc(commentRef, {
      desc: commentData.desc,
      rating: commentData.rating,
    });
  } catch (error) {
    console.log(
      "in firebase services , called from EditCommentModal.js",
      error
    );
  }
}
// Delete a comment from the user -----------------------------------------------------------------------------------------------------
export async function deleteComment(commentId) {
  const commentRefDoc = doc(FIREBASE_DB, "comments", commentId);
  await deleteDoc(commentRefDoc);
}

// Create list (Sub-Collection)-------------------------------------------------------------------------------------------------------------
export async function addList(listname) {
  const userId = setUserId();

  // Check whether this list already exist or not ---------------------
  const parentDocRef = doc(FIREBASE_DB, "users", userId);
  const subcollectionRef = doc(parentDocRef, "lists", listname);
  const document = await getDoc(subcollectionRef);
  if (document.exists()) {
    return true;
  }
  // Add a sub collection with a specified id --------------------------
  try {
    const userDocRef = doc(
      FIREBASE_DB,
      "users",
      userId,
      "lists",
      listname // custom Id
    );

    setDoc(userDocRef, {
      movies: [],
    });
    return false;
  } catch (error) {
    console.log("error in adding list :", error);
    return true;
  }

  /*
  // Add a sub collection with a random id --------------------------
  const userDocRef = doc(FIREBASE_DB, "users", userId);
  const listDocRef = collection(userDocRef, "lists");
  // Set the data for the new subdocument
  addDoc(listDocRef, {
    field1: "Value 1",
    field2: "Value 2",
  }); */
}

// Adding a movie to our list -----------------------------------------------------------------------------------------------------------
export async function addDeleteMovieInList(data) {
  const { movieId, poster, listName } = data;
  const listRef = doc(FIREBASE_DB, "users", setUserId(), "lists", listName);
  const listDoc = await getDoc(listRef);
  const movieFound = !!listDoc
    .data()
    .movies.find((movie) => movie.movieId === movieId);
  if (movieFound) {
    await updateDoc(listRef, {
      movies: arrayRemove({ movieId, poster }),
    });
  } else {
    await updateDoc(listRef, {
      movies: arrayUnion({ movieId, poster }),
    });
  }
}

// check whether a movie is in fav or wishlist------------------------------------------------------------------------------------------------
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
