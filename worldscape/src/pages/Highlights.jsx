import styles from "./Highlights.module.css";

import { useEffect, useState } from "react";

import booksData from "../data/books.json";
import { getBooks } from "../services/books";

import Card from "../components/Card"

function Highlights() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function fetchBooks() {
            const data = await getBooks(booksData);
            setBooks(data);
        }

        fetchBooks();
    }, []);

    // console.log(books)

    return (
        <div className={styles.highlights}>
            <Card title="livros" items={books} />
            <Card title="séries" />
            <Card title="filmes" />
            <Card title="animes" />
        </div>
        
    )
}

export default Highlights