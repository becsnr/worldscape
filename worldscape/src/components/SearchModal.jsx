import styles from "./SearchModal.module.css";

import { useState, useEffect } from "react";

import { searchBooks } from "../services/books";
import { searchMovies } from "../services/movies";
import { searchSeries } from "../services/series";
import { searchBooksInCatalog } from "../services/booksCatalog";
import { addItemToCollection } from "../services/booksCatalog";

function SearchModal({ tipo, onClose, onItemAdded }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function searchItems(searchQuery) {
        let data;

        if (tipo === "livro") {
            data = await searchBooks(searchQuery);

            if (data.length === 0) {
                data = await searchBooksInCatalog(searchQuery);
            }
        } else if (tipo === "filme") {
            data = await searchMovies(searchQuery);
        } else if (tipo === "serie") {
            data = await searchSeries(searchQuery);
        } else if (tipo === "anime") {
            data = await searchSeries(searchQuery);
        } else {
            setResults([]);
            setError("Essa categoria ainda não está diponível.");
            return;
        }

        setResults(data);

        if (data.length === 0) {
            setError("Nenhum resultado encontrado.");
        } else {
            setError("");
        }
    }

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setError("");
            return;
        }

        const timer = setTimeout(async () => {
            try {
                setLoading(true);
                setError("");

                await searchItems(query.trim());
            } catch (erro) {
                setResults([]);
                setError("Não foi possível realizar a pesquisa.");
                console.error(erro);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query, tipo]);

    async function handleAddItem(item) {
        try {
            setError("");

            await addItemToCollection(item.title, tipo, item.isbn, item.autor);

            if (onItemAdded) {
                await onItemAdded();
            }

            setError("Item adicionado à sua coleção!");
        } catch (erro) {
            setError(erro.message);
        }
    }

    return (
        <div className={styles.overlay} onClick={onClose}>
            <section
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="searchModalTitle"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Fechar janela"
                >
                    x
                </button>

                <h2 id="searchModalTitle">
                    Pesquisar {tipo}
                </h2>

                <p>Adicionar item à sua coleção.</p>

                <form onSubmit={(event) => event.preventDefault()}>
                    <input 
                        type="search"
                        placeholder={`Pesquisar ${tipo}...`}
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </form>

                {error && <p className={styles.error}>{error}</p>}

                <div className={styles.results}>
                    {results.map((item) => (
                        <article className={styles.result} key={item.id}>
                            {item.image && (
                                <img src={item.image} alt={item.title} />
                            )}

                            <div>
                                <h3>{item.title}</h3>
                                
                                {tipo === "livro" ? (
                                    item.author && <p>{item.author}</p>
                                ) : (
                                    <>
                                        {item.year && <p>{item.year}</p>}
                                        {item.description && <p>{item.description}</p>}
                                    </>
                                )}
                            </div>

                            <button type="button" onClick={() => handleAddItem(item)}>
                                +
                            </button>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default SearchModal;