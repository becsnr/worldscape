import styles from "./MediaPage.module.css";

function MediaPage({ items }) {
    return (
        <div className={styles.mediaPage}>
            <div className={styles.mediaCover}>
                {items?.map((item) => (
                    <div>
                        <img src={item.image} alt={item.title} />
                        <p>{item.title}</p>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default MediaPage