const headers = {
  "Content-Type": "application/json",
};
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
  const response = await fetch("http://192.168.1.9:8000/auth/login", {
    headers,
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return response;
};

export const getUser = async (userId) => {
  const res = await fetch("http://192.168.1.9:8000/auth/users/" + userId, {
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
  const res = await fetch(
    "http://192.168.1.9:8000/reviews/getUserReviews/" + email,
    {
      headers,
    }
  );
  if (res.ok) {
    const data = await res.json();
    return data.userReviews;
  }
};

//-------------------------------------------------------------------------------------
// Lists-----------------------------------------------------------------------------

export const addMovie = async (movieData, userId, list) => {
  try {
    const response = await fetch("http://192.168.1.9:8000/lists/movie", {
      headers,
      method: "POST",
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
  // console.log(addedMovie.genres);

  // If it's already in the fav/wishlist, Remove it
  if (isSet) {
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
