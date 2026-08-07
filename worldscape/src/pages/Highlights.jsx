import styles from "./Highlights.module.css"

import Card from "../components/Card"

function Highlights() {
    return (
        <div className={styles.highlights}>
            <Card title="livros" />
            <Card title="séries" />
            <Card title="filmes" />
            <Card title="animes" />
        </div>
        
    )
}

export default Highlights