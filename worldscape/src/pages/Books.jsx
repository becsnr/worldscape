// import styles from "./Books.module.css";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import MediaPage from "../components/MediaPage";
import FilterHeader from "../components/filters/FilterHeader";
import SearchModal from "../components/SearchModal";

function Books() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { items } = useOutletContext();
    const books = items
        .filter((item) => item.tipo === "livro")
        .map((item) => ({
            ...item,
            title: item.titulo,
            author: item.autor
        }));

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