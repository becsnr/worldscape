import { useState } from "react";
import MediaPage from "../components/MediaPage";
import FilterHeader from "../components/FilterHeader";
import SearchModal from "../components/SearchModal";

function Series({ series }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section>
            <FilterHeader />

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