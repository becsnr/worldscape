import styles from "./Card.module.css";

import AddButton from "../buttons/AddButton";

function Card({ title, items, onDelete }) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3>{title}</h3>

                <AddButton />
            </div> 

            <div className={styles.covers}>
                {items?.map((item) => (
                    item.image ? (
                        <img 
                            key={item.id ?? item.title}
                            src={item.image} 
                            alt={item.title}
                        />
                    ) : (
                        <p key={item.id ?? item.titulo}>
                            {item.titulo || item.title}
                        </p>
                    )
                ))}
            </div>
        </div>
    )
}

export default Card;