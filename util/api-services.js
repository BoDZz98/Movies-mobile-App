import axios from "axios";
import { convertMinutesToTime } from "./time";

const configHeaders = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2U0ZWRkZDlmN2I2ZTVlY2Q3NmQyYzcxNDdkODBmZiIsInN1YiI6IjY1MTUyZTc2YzUwYWQyMDBlYWJjYTllNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sQnd-ukFhZTaf5BUPQn1TZxBHK0Qkj-cANZ5AsTZuhg",
};

// Get Popular Movies ----------------------------------------------------------------------------------------------------------------------------
export async function fetchPopularMovies() {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      headers: configHeaders,
    }
  );
  return response.data.results;
}

// Get new Movies ----------------------------------------------------------------------------------------------------------------------------
export async function fetchNewMovies() {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/upcoming",
    {
      headers: configHeaders,
    }
  );

  return response.data.results;
}

// Get Top Rated Movies ----------------------------------------------------------------------------------------------------------------------------
export async function fetchTopRatedMovies() {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/top_rated",
    {
      headers: configHeaders,
    }
  );
  return response.data.results;
}

// Get all details related to a movie ------------------------------------------------------------------------------------------------------
export async function fetchMovieDetails(movieId) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos,images,credits`,
    {
      headers: configHeaders,
    }
  );
  // console.log(response.data);
  const { hours, minutes } = convertMinutesToTime(response.data.runtime);
  const actors = response.data.credits.cast.slice(0, 20);
  const youtubeTrailerKey = response.data.videos.results.find(
    (video) => video.type === "Trailer"
  ).key;
  // console.log("trailer is", trailerKey);
  const newMovieObject = {
    id: response.data.id,
    title: response.data.title,
    poster: response.data.poster_path,
    vote_average: response.data.vote_average.toFixed(1),
    release_date: response.data.release_date,
    runtime: `${hours}h ${minutes} min`,
    overview: response.data.overview,
    genres: response.data.genres,
    images: response.data.images.backdrops,
    cast: actors,
    youtubeTrailerKey,
  };
  // console.log(newMovieObject.cast.length);

  return newMovieObject;
}
//  Used as a helper function to get all the genres details available at the API --------------------------------------------------------
export async function getAllGenres() {
  const allGenres = await axios.get(
    "https://api.themoviedb.org/3/genre/movie/list",
    {
      headers: configHeaders,
    }
  );
  return allGenres.data.genres;
}
// Function used for fetching movies according to the user input
export async function searchMovie(movieName) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${movieName}&language=en-US&page=1`,
    {
      headers: configHeaders,
    }
  );

  const genresDetails = await getAllGenres();
  const newFormatedData = [];

  response.data.results.map((movie) => {
    // getting the genres names by it's ID's --------------
    const genreNames = [];
    movie.genre_ids.map((movieGenres) => {
      const genreObject = genresDetails.find(
        (genre) => genre.id === movieGenres
      );
      genreNames.push(genreObject.name);
    });

    newFormatedData.push({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      rating: movie.vote_average.toFixed(1),
      release_date: movie.release_date,
      genres: genreNames,
    });
  });
  return newFormatedData;
}
