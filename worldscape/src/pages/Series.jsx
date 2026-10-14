import { useState } from "react";
import MediaPage from "../components/MediaPage";
import AddButton from "../components/AddButton";
import SearchModal from "../components/SearchModal";

function Series({ series }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section>
            <header>
                <p>Filtro</p>

                <AddButton onClick={() => setIsModalOpen(true)} />
            </header>

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