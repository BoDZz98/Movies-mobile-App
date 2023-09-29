import { createSlice } from "@reduxjs/toolkit";

const initMoviesState = { popularMovies: [] };
const moviesSlice = createSlice({
  name: "movies",
  initialState: initMoviesState,
  reducers: {
    setPopularMovies(state, action) {
      const movies = action.payload;
      for (const index in movies) {
        const movieObject = {
          title: movies[index].title,
          rating: movies[index].vote_average,
        };
        state.popularMovies.push(movieObject);
      }
      console.log(state.popularMovies);
    },
  },
});

export const moviesAction = moviesSlice.actions;
export default moviesSlice;
