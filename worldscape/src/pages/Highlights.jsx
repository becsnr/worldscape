import styles from "./Highlights.module.css";

import Card from "../components/Card";

function Highlights({ books, movies, series, animes }) {
    

    //console.log(series)

    return (
        <div className={styles.highlights}>
            <Card title="livros" items={books} />
            <Card title="filmes" items={movies} />
            <Card title="séries" items={series} />
            <Card title="animes" items={animes} />
        </div>
        
    )
}

export default Highlights