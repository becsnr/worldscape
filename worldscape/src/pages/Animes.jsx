import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import MediaPage from "../components/MediaPage";
import FilterHeader from "../components/filters/FilterHeader";
import SearchModal from "../components/SearchModal";

function Animes() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { items, refreshItems, handleDeleteItem } = useOutletContext();

    const animes = items
        .filter((item) => item.tipo === "anime")
        .map((item) => ({
            ...item,
            title: item.titulo,
            author: item.autor
        }));

    return (
        <section>
            <FilterHeader onAddClick={() => setIsModalOpen(true)} />

            <MediaPage items={animes} onDelete={handleDeleteItem} />

            {isModalOpen && (
                <SearchModal 
                    tipo="anime"
                    onClose={() => setIsModalOpen(false)}
                    onItemAdded={refreshItems}
                />
            )}
        </section>
    )
}

export default Animes;