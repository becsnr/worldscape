import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import MediaPage from "../components/MediaPage";
import FilterHeader from "../components/filters/FilterHeader";
import SearchModal from "../components/SearchModal";

function Animes() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { items } = useOutletContext();
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

            <MediaPage items={animes} />

            {isModalOpen && (
                <SearchModal 
                    tipo="livro"
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </section>
    )
}

export default Animes;