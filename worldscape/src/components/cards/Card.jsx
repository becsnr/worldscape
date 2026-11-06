import styles from "./Card.module.css";

import AddButton from "../buttons/AddButton";
import CardMenu from "../buttons/CardMenu";

function Card({ title, items, onDelete }) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3>{title}</h3>

                <div className={styles.cardButtons}>
                    <AddButton />
                    <CardMenu />
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