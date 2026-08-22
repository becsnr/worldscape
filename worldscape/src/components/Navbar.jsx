import styles from "./Navbar.module.css";

import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className={styles.navbar}>
            <Link className={styles.link} to="/">destaques</Link>

            <Link className={styles.link} to="/books">livros</Link>

            <Link className={styles.link} to="/movies">filmes</Link>

            <Link className={styles.link} to="/series">séries</Link>

            <Link className={styles.link} to="/animes">animes</Link>
        </div>
    )
}

export default Navbar