// import styles from "./Books.module.css";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import MediaPage from "../components/MediaPage";
import FilterHeader from "../components/filters/FilterHeader";
import SearchModal from "../components/SearchModal";

function Books() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { items, refreshItems, handleDeleteItem } = useOutletContext();
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

            <MediaPage items={books} onDelete={handleDeleteItem} />

            {isModalOpen && (
                <SearchModal 
                    tipo="livro"
                    onClose={() => setIsModalOpen(false)}
                    onItemAdded={refreshItems}
                />
            )}
        </section>
    );
}

export default Books;