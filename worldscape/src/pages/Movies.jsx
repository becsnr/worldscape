import { useState } from "react";
import MediaPage from "../components/MediaPage";
import FilterHeader from "../components/FilterHeader";
import SearchModal from "../components/SearchModal";

function Movies({ movies }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section>
            <FilterHeader />

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