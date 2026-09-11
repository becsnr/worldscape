import styles from "./Highlights.module.css";

import Card from "../components/Card";

function Highlights({ books, movies, series, animes }){
    return (
        <div className={styles.highlights}>
            <Card title="📚 universos em páginas" items={books} />
            <Card title="🎬 sessão da tarde" items={movies} />
            <Card title="🍿 só mais um episódio" items={series} />
            <Card title="🍥 versão otaku" items={animes} />
        </div>
        
    )
}

export default Highlights