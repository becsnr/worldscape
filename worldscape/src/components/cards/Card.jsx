import styles from "./Card.module.css";

import AddButton from "../buttons/AddButton";
import CardMenu from "../buttons/CardMenu";

function Card({ title, items, tipo, onDelete, expanded = false }) {
    return (
        <div className={`${styles.card} ${expanded ? styles.expanded : ""}`}>
            <div className={styles.header}>
                <h3>{title}</h3>

                <div className={styles.cardButtons}>
                    <AddButton />
                    <CardMenu tipo={tipo} title={title} />
                </div>
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