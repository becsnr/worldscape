import styles from "./Card.module.css"

function Card({title}) {
    return (
        <div className={styles.card}>
            <h3>{title} favs</h3> 
        </div>
    )
}

export default Card