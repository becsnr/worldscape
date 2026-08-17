import styles from "./Highlights.module.css";

import { useEffect, useState } from "react";

import booksData from "../data/books.json";
import { getBooks } from "../services/books";
import moviesData from "../data/movies.json";
import { getMovies } from "../services/movies";
import seriesData from "../data/series.json";
import { getSeries } from "../services/series";
import animesData from "../data/animes.json"

import Card from "../components/Card";

function Highlights() {
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

    //console.log(series)

    return (
        <div className={styles.highlights}>
            <Card title="livros" items={books} />
            <Card title="filmes" items={movies} />
            <Card title="séries" items={series} />
            <Card title="animes" items={animes} />
        </div>
        
    )
}

export default Highlights