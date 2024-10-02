const headers = {
  "Content-Type": "application/json",
};
const IPAdress = "http://192.168.1.44:8000";
// Auth-----------------------------------------------------------------------------
export const signUp = async (email, password, name) => {
  const response = await fetch("http://192.168.1.9:8000/auth/signup", {
    headers,
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  // if email is not already used
  if (response.ok) {
    // console.log("Data is", await response.json());
    const res = await login(email, password);
    return res;
  }
  // if email is already used
  if (response.status === 400 || response.status === 500) {
    console.log("error is", await response.json());
  }
};

export const login = async (email, password) => {
  const response = await fetch(IPAdress + "/auth/login", {
    headers,
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return response;
};

export const getUser = async (userId) => {
  const res = await fetch(IPAdress + "/auth/users/" + userId, {
    headers,
  });

  const data = await res.json();

  if (res.ok) {
    return data.user;
  } else {
    console.log("error is", data.message);
  }
};
//-------------------------------------------------------------------------------------
// Reviews-----------------------------------------------------------------------------

export const getUserReviews = async (email) => {
  const res = await fetch(IPAdress + "/reviews/getUserReviews/" + email, {
    headers,
  });
  if (res.ok) {
    const data = await res.json();
    return data.userReviews;
  }
};

//-------------------------------------------------------------------------------------
// Adding movies to fav and wishlist-----------------------------------------------------------------------------

export const addMovie = async (movieData, userId, list) => {
  try {
    const response = await fetch(IPAdress + "/lists/movie", {
      headers,
      method: "POST",
      body: JSON.stringify({ userId, list, movie: movieData }),
    });

    return response;
  } catch (error) {
    console.log("Error in my-backend-services/addMovie", error);
  }
};

export const removeMovie = async (movieData, userId, list) => {
  try {
    const response = await fetch(IPAdress + "/lists/movie", {
      headers,
      method: "DELETE",
      body: JSON.stringify({ userId, list, movie: movieData }),
    });

    return response;
  } catch (error) {
    console.log("Error in my-backend-services/addMovie", error);
  }
};

export const addRemoveMovie = async (movieData, isSet, userId, list) => {
  const addedMovie = {
    id: movieData.id,
    title: movieData.title,
    rating: movieData.vote_average,
    poster: movieData.poster,
    backdrop_path: movieData.backdrop_path,
    genres: movieData.genres.map((g) => g.name),
    runtime: movieData.runtime,
    release_date: movieData.release_date,
    vote_count: movieData.vote_count,
  };
  // console.log(addedMovie.backdrop_path);

  // If it's already in the fav/wishlist, Remove it
  if (isSet) {
    const res = await removeMovie(addedMovie, userId, list);
    if (res.ok) {
      const data = await res.json();
      // console.log(data);
      return data;
    }
  }
  // else, Add it
  else {
    const res = await addMovie(addedMovie, userId, list);
    if (res.ok) {
      const data = await res.json();
      // console.log(data);
      return data;
    }
  }
};

//-------------------------------------------------------------------------------------
// User Lists----------------------------------------------------------------------------

export const createUserList = async (userId, listName) => {
  // console.log(userId, listName);

  try {
    const response = await fetch(IPAdress + "/lists/userLists", {
      headers,
      method: "POST",
      body: JSON.stringify({ userId, list: listName }),
    });
    // If the name is unique
    // console.log(await response.json());
    if (response.ok) {
      const data = await response.json();

      return { ok: true, data };
    }
    // If the name is not unique
    return { ok: false };
  } catch (error) {
    console.log("Error in my-backend-services/createUserList", error);
  }
};

export const deleteUserList = async (userId, listName) => {
  try {
    const response = await fetch(IPAdress + "/lists/userLists", {
      headers,
      method: "DELETE",
      body: JSON.stringify({ userId, listName }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("Error in my-backend-services/deleteUserList", error);
  }
};

export const updateUserList = async (userId, oldListName, newListName) => {
  try {
    const res = await fetch(IPAdress + "/lists/userLists", {
      headers,
      method: "PATCH",
      body: JSON.stringify({ userId, oldListName, newListName }),
    });

    if (res.ok) {
      const data = await res.json();
      return { ok: true, data };
    } else {
      return { ok: false };
    }
  } catch (error) {
    console.log("Error in my-backend-services/updateUserList", error);
  }
};

export const manageMovieInUserList = async (movie, userId, collectionId) => {
  const updatedMovie = {
    ...movie,
    genres: movie.genres.map((g) => g.name),
  };

  try {
    const res = await fetch(IPAdress + "/lists/userLists/manageMovie", {
      headers,
      method: "POST",
      body: JSON.stringify({ movie: updatedMovie, userId, collectionId }),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.log("Error in my-backend-services/manageMovieInUserList", error);
  }
};
