// import styles from "./Books.module.css";
import { useState } from "react";
import MediaPage from "../components/MediaPage";
import AddButton from "../components/AddButton";
import SearchModal from "../components/SearchModal";
// import { searchBooks } from "../services/books";

function Books({ books }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section>
            <header>
                <p>Filtro</p>

                <AddButton onClick={() => setIsModalOpen(true)} />
            </header>

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