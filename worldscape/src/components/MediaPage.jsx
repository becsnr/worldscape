import styles from "./MediaPage.module.css";

function MediaPage({ items }) {
    return (
        <div className={styles.mediaPage}>
            <div className={styles.mediaCover}>
                {items?.map((item) => (
                    <div className={styles.mediaCard} key={item.title}>
                        <img src={item.image} alt={item.title} />

                        <div className={styles.cardInfo}>
                            <p>{item.title}</p>
                            <span>{item.author}</span>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default MediaPage