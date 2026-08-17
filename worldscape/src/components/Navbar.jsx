import styles from "./Navbar.module.css"

function Navbar() {
    return (
        <div className={styles.navbar}>
            <p>destaques</p>
            <p>livros</p>
            <p>filmes</p>
            <p>séries</p>
            <p>animes</p>
        </div>
    )
}

export default Navbar