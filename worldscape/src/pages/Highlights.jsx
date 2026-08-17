import styles from "./Highlights.module.css";

import { useEffect, useState } from "react";

import booksData from "../data/books.json";
import { getBooks } from "../services/books";
import moviesData from "../data/movies.json";
import { getMovies } from "../services/movies";

import Card from "../components/Card"

function Highlights() {
    const [books, setBooks] = useState([]);
    const [movies, setMovies] = useState([]);

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

    console.log(movies)

    return (
        <div className={styles.highlights}>
            <Card title="livros" items={books} />
            <Card title="filmes" items={movies} />
            <Card title="séries" />
            <Card title="animes" />
        </div>
        
    )
}

export default Highlights