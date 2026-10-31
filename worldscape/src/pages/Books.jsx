// import styles from "./Books.module.css";
import { useState, useEffect } from "react";
import MediaPage from "../components/MediaPage";
import FilterHeader from "../components/FilterHeader";
import SearchModal from "../components/SearchModal";
import { getBooksFromCatalog } from "../services/booksCatalog";

function Books() {
    const [books, setBooks]  = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function carregarLivros() {
            try {
                const livros = await getBooksFromCatalog();

                const livrosFormatados = livros.map((livro) => ({
                    title: livro.titulo,
                    author: livro.autor,
                    image: livro.capa,
                    isbn: livro.isbn
                }));
                
                setBooks(livrosFormatados);
            } catch (erro) {
                console.error("Erro ao carregar os livros: ", erro);
            }
        }

        carregarLivros();
    }, []);

    return (
        <section>
            <FilterHeader onAddClick={() => setIsModalOpen(true)} />

            <MediaPage items={books} />

            {isModalOpen && (
                <SearchModal 
                    tipo="livro"
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </section>
    );
}

export default Books;