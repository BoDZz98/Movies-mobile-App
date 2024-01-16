import {
  Firestore,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB, STORAGE } from "../firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";

export const baseImageURL = "http://image.tmdb.org/t/p/original";

export function setUserId() {
  const userId = FIREBASE_AUTH?.currentUser?.uid;
  return userId;
}

// -------------------------------------------------------------------------------------------------------------------------------------------
export async function getUserListsLength() {
  const lists = query(
    collection(doc(FIREBASE_DB, "users", setUserId()), "lists")
  );
  const listsLength = (await getDocs(lists)).size;
  return listsLength;
}

// -------------------------------------------------------------------------------------------------------------------------------------------
export async function getUserData(user) {
  // getting the data in the user doc-----------------------------
  const userRefDoc = doc(FIREBASE_DB, "users", user?.uid);
  const userSnapDoc = await getDoc(userRefDoc);

  // getting comments of this particular user------------------
  const comments = [];
  const userComments = query(
    collection(FIREBASE_DB, "comments"),
    where("userId", "==", user.uid)
  );
  const userCommentsSnapshot = await getDocs(userComments);
  userCommentsSnapshot.forEach((doc) => {
    comments.push({ commentId: doc.id, ...doc.data() });
  });
  // getting profile picture -------------------
  try {
    const imgsRef = ref(STORAGE, `profileImages/${user.uid}`);
    const profilePicture = await getDownloadURL(imgsRef);
    return { userData: userSnapDoc.data(), comments, profilePicture };
  } catch (error) {
    return {
      userData: userSnapDoc.data(),
      comments,
      profilePicture:
        "https://firebasestorage.googleapis.com/v0/b/movies-imdp.appspot.com/o/defaultPP.png?alt=media&token=b2846ee3-12ba-47c6-864b-1e015dfbe41a",
    };
  }
}

// Update user name---------------------------------------------------------------------------------
export async function updateUserName(newUserName) {
  const userRef = doc(FIREBASE_DB, "users", setUserId());
  await updateDoc(userRef, {
    userName: newUserName,
  });
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
// Delete a comment  -----------------------------------------------------------------------------------------------------
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
// Edit List---------------------------------------------------------------------------------------------------
export async function editList(oldListname, newListName) {
  const userId = setUserId();
  // Check whether this list already exist or not ---------------------
  const parentDocRef = doc(FIREBASE_DB, "users", userId);
  const subcollectionRef = doc(parentDocRef, "lists", newListName);
  const document = await getDoc(subcollectionRef);
  if (document.exists()) {
    return true;
  }
  // Copy the data of the old list ,then delete it --
  const listRef = doc(parentDocRef, "lists", oldListname);
  const listData = (await getDoc(listRef)).data();
  deleteDoc(listRef);

  // create a new list with the desired name , then paste the old data into it
  const listDocRef = doc(
    FIREBASE_DB,
    "users",
    userId,
    "lists",
    newListName // custom Id
  );
  setDoc(listDocRef, listData);

  return false;
}
// Delete List--------------------------------------------------------------------------------
export function deleteList(listName) {
  const parentDocRef = doc(FIREBASE_DB, "users", setUserId());
  const listRef = doc(parentDocRef, "lists", listName);
  deleteDoc(listRef);
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
