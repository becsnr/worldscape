import { useState } from "react";
import MediaPage from "../components/MediaPage";
import AddButton from "../components/AddButton";
import SearchModal from "../components/SearchModal";

function Movies({ movies }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section>
            <header>
                <p>Filtro</p>

                <AddButton onClick={() => setIsModalOpen(true)} />
            </header>

            <MediaPage items={movies} />

            {isModalOpen && (
                <SearchModal 
                    tipo="filme"
                    onClose={() => setIsModalOpen(false)}
                />
            )}

        </section>
    )
}

export default Movies