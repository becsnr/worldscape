import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useEffect, useState } from "react";

import booksData from "./data/books.json";
import { getBooks } from "./services/books";
import moviesData from "./data/movies.json";
import { getMovies } from "./services/movies";
import seriesData from "./data/series.json";
import { getSeries } from "./services/series";
import animesData from "./data/animes.json";

import Layout from "./layout/Layout";
import Highlights from "./pages/Highlights";
import Books from "./pages/Books";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Animes from "./pages/Animes";

function App() {
  const [books, setBooks] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
      async function fetchBooks() {
          const data = await getBooks(booksData);
          setBooks(data);
      }

      fetchBooks();
  }, []);

  useEffect(() => {
      async function fetchMovies() {
          const data = await getMovies(moviesData);
          setMovies(data);
      }

      fetchMovies();
  }, []);

  useEffect(() => {
      async function fetchSeries() {
          const data = await getSeries(seriesData);
          setSeries(data);
      }

      fetchSeries();
  }, []);

  useEffect(() => {
      async function fetchAnimes() {
          const data = await getSeries(animesData);
          setAnimes(data);
      }

      fetchAnimes();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Highlights books={books} movies={movies} series={series} animes={animes} />} />
            
            <Route path="/books" element={<Books books={books} />} />

            <Route path="/movies" element={<Movies movies={movies} />} />

            <Route path="/series" element={<Series series={series} />} />

            <Route path="/animes" element={<Animes animes={animes} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
