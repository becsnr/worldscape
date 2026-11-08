import styles from "./Navbar.module.css";

import { Link, useParams } from "react-router-dom";

function Navbar() {
    const { nick } = useParams();

    return (
        <div className={styles.navbar}>
            <Link className={styles.link} to={`/${nick}`}>destaques</Link>

            <Link className={styles.link} to={`/${nick}/books`}>livros</Link>

            <Link className={styles.link} to={`/${nick}/movies`}>filmes</Link>

            <Link className={styles.link} to={`/${nick}/series`}>séries</Link>

            <Link className={styles.link} to={`/${nick}/animes`}>animes</Link>
        </div>
    )
}

export default Navbar;