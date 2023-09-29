import axios from "axios";

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