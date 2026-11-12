import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import MediaPage from "../components/MediaPage";
import FilterHeader from "../components/filters/FilterHeader";
import SearchModal from "../components/SearchModal";

function Movies() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { items, refreshItems, handleDeleteItem } = useOutletContext();
    const movies = items
        .filter((item) => item.tipo === "filme")
        .map((item) => ({
            ...item,
            title: item.titulo,
            author: item.autor
        }));

    return (
        <section>
            <FilterHeader onAddClick={() => setIsModalOpen(true)} />

            <MediaPage items={movies} onDelete={handleDeleteItem} />

            {isModalOpen && (
                <SearchModal 
                    tipo="filme"
                    onClose={() => setIsModalOpen(false)}
                    onItemAdded={refreshItems}
                />
            )}

        </section>
    )
}

export default Movies