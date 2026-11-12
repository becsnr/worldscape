import styles from "./Highlights.module.css";
import { useOutletContext } from "react-router-dom";

import Card from "../components/cards/Card";

function Highlights(){
    const { items, handleDeleteItem } = useOutletContext();

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
            />

            <Card 
                title="🎬 sessão da tarde" 
                items={movies} 
                tipo={"filme"} 
                onDelete={handleDeleteItem}
            />

            <Card 
                title="🍿 só mais um episódio" 
                items={series} 
                tipo={"serie"} 
                onDelete={handleDeleteItem}
            />

            <Card 
                title="🍥 versão otaku" 
                items={animes} 
                tipo={"anime"} 
                onDelete={handleDeleteItem}
            />
        </div>
        
    )
}

export default Highlights;