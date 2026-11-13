import styles from "./Card.module.css";

import { useState } from "react";

import AddButton from "../buttons/AddButton";
import CardMenu from "../buttons/CardMenu";

function Card({ title, items, tipo, onDelete, expanded = false }) {
    const [selectingItem, setSelectingItem] = useState(false);
    const [selectingItemId, setSelectingItemId] = useState(null);

    return (
        <div className={`${styles.card} ${expanded ? styles.expanded : ""} ${selectingItem ? styles.selecting : ""}`}>
            <div className={styles.header}>
                <h3>{title}</h3>

                <div className={styles.cardButtons}>
                    <AddButton />
                    <CardMenu 
                        tipo={tipo} 
                        title={title} 
                        items={items} 
                        onStartSelecting={() => setSelectingItem(true)}
                    />
                </div>
            </div> 

            <div className={styles.covers}>
                {items?.map((item) => (
                    item.image ? (
                        <img 
                            key={item.id ?? item.title}
                            src={item.image} 
                            alt={item.title}
                            onClick={() => {
                                if (selectingItem) {
                                    setSelectingItemId(item.id);
                                }
                            }}
                            style={{
                                outline: selectingItemId === item.id ? "3px solid #8a67d8" : "none"
                            }}
                        />
                    ) : (
                        <p 
                            key={item.id ?? item.titulo}
                            onClick={() => {
                                if (selectingItem) {
                                    setSelectingItemId(item.id);
                                }
                            }}
                            style={{
                                outline: selectingItemId === item.id ? "3px solid #8a67d8" : "none"
                            }}
                        >
                            {item.titulo || item.title}
                        </p>
                    )
                ))}
            </div>

            {selectingItem && (
                <div className={styles.selectionActions}>
                    <button 
                        className={styles.cancelButton}
                        onClick={() => {
                        setSelectingItem(false);
                        setSelectingItemId(null);
                    }}>
                        Cancelar
                    </button>

                    <button 
                        className={styles.removeButton}
                        disabled={!selectingItemId}
                        onClick={async () => {
                            await onDelete(selectingItemId);
                            setSelectingItem(false);
                            setSelectingItemId(null);
                        }}
                    >
                        Remover item
                    </button>
                </div>
            )}
        </div>
    )
}

export default Card;