import { createSlice } from "@reduxjs/toolkit";

const baseImageURL = "http://image.tmdb.org/t/p/original";

const initMoviesState = {
  popularMovies: [],
  newMovies: [],
  topRatedMovies: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: initMoviesState,
  reducers: {
    setPopularMovies(state, action) {
      const movies = action.payload;
      for (const index in movies) {
        const movieObject = {
          id: movies[index].id,
          title: movies[index].title,
          rating: movies[index].vote_average.toFixed(1),
          cover: baseImageURL + movies[index].poster_path,
        };
        state.popularMovies.push(movieObject);
      }
      // console.log(state.popularMovies);
    },
    setNewMovies(state, action) {
      const movies = action.payload;
      for (const index in movies) {
        const movieObject = {
          id: movies[index].id,
          title: movies[index].title,
          rating: movies[index].vote_average.toFixed(1),
          cover: baseImageURL + movies[index].poster_path,
        };
        state.newMovies.push(movieObject);
      }
    },
    setTopRatedMovies(state, action) {
      const movies = action.payload;
      for (const index in movies) {
        const movieObject = {
          id: movies[index].id,
          title: movies[index].title,
          rating: movies[index].vote_average.toFixed(1),
          cover: baseImageURL + movies[index].poster_path,
        };
        state.topRatedMovies.push(movieObject);
      }
    },
  },
});

export const moviesAction = moviesSlice.actions;
export default moviesSlice;
