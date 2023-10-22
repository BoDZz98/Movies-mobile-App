import axios from "axios";
import { convertMinutesToTime } from "./time";

const configHeaders = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2U0ZWRkZDlmN2I2ZTVlY2Q3NmQyYzcxNDdkODBmZiIsInN1YiI6IjY1MTUyZTc2YzUwYWQyMDBlYWJjYTllNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sQnd-ukFhZTaf5BUPQn1TZxBHK0Qkj-cANZ5AsTZuhg",
};

export async function fetchPopularMovies() {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    {
      headers: configHeaders,
    }
  );
  // The response return an array of objects with a key called results
  // console.log(response.data.results[0].title);

  return response.data.results;
}

export async function fetchNewMovies() {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/upcoming",
    {
      headers: configHeaders,
    }
  );

  return response.data.results;
}

export async function fetchMovieDetails(movieId) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos,images,credits`,
    {
      headers: configHeaders,
    }
  );
  // console.log(response.data);
  const { hours, minutes } = convertMinutesToTime(response.data.runtime);
  const actors = response.data.credits.cast.slice(0, 5);
  const newMovieObject = {
    title: response.data.title,
    vote_average: response.data.vote_average.toFixed(1),
    release_date: response.data.release_date,
    runtime: `${hours}h ${minutes} min`,
    overview: response.data.overview,
    genres: response.data.genres,
    images: response.data.images.backdrops,
    cast: actors,
  };
  console.log(newMovieObject.cast.length);

  return newMovieObject;
}
