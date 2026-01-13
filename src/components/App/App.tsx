import { useState } from "react";
import { Toaster } from "react-hot-toast";

import styles from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";

import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function handleSearch(query: string) {
    setIsLoading(true);
    setIsError(false);
    setMovies([]);

    try {
      const results = await fetchMovies(query);
      setMovies(results);
    } catch (error) {
      setIsError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSelectMovie = (movie: Movie) => {
    console.log("selected:", movie);
  };

  return (
    <div className={styles.app}>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error occurred</p>}

      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
    </div>
  );
}
