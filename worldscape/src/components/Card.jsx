import styles from "./Card.module.css";

import AddButton from "./AddButton";

function Card({ title, items }) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3>{title}</h3>

                <AddButton />
            </div> 

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