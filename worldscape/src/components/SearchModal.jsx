import styles from "./SearchModal.module.css";
import { useState } from "react";
import { searchBooks } from "../services/books";
import { searchMovies } from "../services/movies";
import { searchSeries } from "../services/series";

function SearchModal({ tipo, onClose }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSearch(event) {
        event.preventDefault();

        if (!query.trim()) {
            setResults([]);
            setError("Digite o que deseja pesquisar.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            let data;

            if (tipo === "livro") {
                data = await searchBooks(query.trim());
            } else if (tipo === "filme") {
                data = await searchMovies(query.trim());
            } else if (tipo === "serie") {
                data = await searchSeries(query.trim());
            } else {
                setResults([]);
                setError("Essa categoria ainda não está disponível.");
                return;
            }

            setResults(data);
            

            if (data.length === 0) {
                setError("Nenhum resultado encontrado.");
            }
        } catch {
            setResults([]);
            setError("Não foi possível realizar a pesquisa.");
        } finally {
            setLoading(false);
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

                <form onSubmit={handleSearch}>
                    <input 
                        type="search"
                        placeholder={`Pesquisar ${tipo}...`}
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Buscando..." : "Pesquisar"}
                    </button>
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
                                    <p>{item.author}</p>
                                ) : (
                                    <>
                                        {item.year && <p>{item.year}</p>}
                                        {item.description && <p>{item.description}</p>}
                                    </>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default SearchModal;