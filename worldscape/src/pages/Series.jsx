import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import MediaPage from "../components/MediaPage";
import FilterHeader from "../components/filters/FilterHeader";
import SearchModal from "../components/SearchModal";

function Series() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { items } = useOutletContext();
    const series = items
        .filter((item) => item.tipo === "serie")
        .map((item) => ({
            ...item,
            title: item.titulo,
            author: item.autor
        }));

    return (
        <section>
            <FilterHeader onAddClick={() => setIsModalOpen(true)} />

            <MediaPage items={series} />

            {isModalOpen && (
                <SearchModal 
                    tipo="serie"
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </section>
    )
}

export default Series