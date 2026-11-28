import styles from "./Highlights.module.css";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";

import Card from "../components/cards/Card";
import SearchModal from "../components/SearchModal";

function Highlights(){
    const { items, refreshItems, handleDeleteItem, handleUpdateOrder } = useOutletContext();
    const [tipoModal, setTipoModal] = useState(null);

    const books = items.filter(item => item.tipo === "livro");
    const movies = items.filter(item => item.tipo === "filme");
    const series = items.filter(item => item.tipo === "serie");
    const animes = items.filter(item => item.tipo === "anime");

    return (
        <div className={styles.highlights}>
            <Card 
                title="📚 universos em páginas" 
                items={books} 
                tipo={"livro"} 
                onDelete={handleDeleteItem}
                onUpdateOrder={handleUpdateOrder}
                onAdd={() => setTipoModal("livro")}
            />

            <Card 
                title="🎬 sessão da tarde" 
                items={movies} 
                tipo={"filme"} 
                onDelete={handleDeleteItem}
                onUpdateOrder={handleUpdateOrder}
                onAdd={() => setTipoModal("filme")}
            />

            <Card 
                title="🍿 só mais um episódio" 
                items={series} 
                tipo={"serie"} 
                onDelete={handleDeleteItem}
                onUpdateOrder={handleUpdateOrder}
                onAdd={() => setTipoModal("serie")}
            />

            <Card 
                title="🍥 versão otaku" 
                items={animes} 
                tipo={"anime"} 
                onDelete={handleDeleteItem}
                onUpdateOrder={handleUpdateOrder}
                onAdd={() => setTipoModal("anime")}
                />

            {tipoModal && (
                <SearchModal 
                    tipo={tipoModal}
                    onClose={() => setTipoModal(null)}
                    onItemAdded={refreshItems}
                />
            )}
        </div>
        
    )
}

export default Highlights;