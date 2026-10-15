// import styles from "./Books.module.css";
import { useState } from "react";
import MediaPage from "../components/MediaPage";
import FilterHeader from "../components/FilterHeader";
import SearchModal from "../components/SearchModal";
// import { searchBooks } from "../services/books";

function Books({ books }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section>
            <FilterHeader />

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