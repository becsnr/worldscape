import styles from "./Highlights.module.css";
import { useOutletContext } from "react-router-dom";

import Card from "../components/cards/Card";

function Highlights(){
    const { items } = useOutletContext();

    const books = items.filter(item => item.tipo === "livro");
    const movies = items.filter(item => item.tipo === "filme");
    const series = items.filter(item => item.tipo === "serie");
    const animes = items.filter(item => item.tipo === "anime");

    return (
        <div className={styles.highlights}>
            <Card title="📚 universos em páginas" items={books} tipo={"livro"} />
            <Card title="🎬 sessão da tarde" items={movies} tipo={"filme"} />
            <Card title="🍿 só mais um episódio" items={series} tipo={"serie"} />
            <Card title="🍥 versão otaku" items={animes} tipo={"anime"} />
        </div>
        
    )
}

export default Highlights