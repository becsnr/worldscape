import styles from "./SearchModal.module.css";
import { useState } from "react";
import { searchBooks } from "../services/books";

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

            if (tipo !== "livro") {
                setResults([]);
                setError("A pesquisa dessa categoria será concectada depois.");
                return;
            }

            const data = await searchBooks(query.trim());
            console.log("RESULTADOS DA BUSCA:", data);
            setResults(data);

            if (data.length === 0) {
                setError("Nenhum livro encontrado.");
            }
        } catch {
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
                                <p>{item.author}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default SearchModal;