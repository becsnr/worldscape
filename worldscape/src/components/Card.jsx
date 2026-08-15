import styles from "./Card.module.css"

function Card({ title, items }) {
    return (
        <div className={styles.card}>
            <h3>{title} favs</h3> 

            <div className={styles.covers}>
                {items?.map((item) => (
                    <img src={item.image} alt={item.title} />
                ))
                }
            </div>
        </div>
    )
}

export default Card