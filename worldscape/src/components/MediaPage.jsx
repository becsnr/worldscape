import styles from "./MediaPage.module.css";

function MediaPage({ items }) {
    return (
        <div className={styles.mediaPage}>
            <div className={styles.mediaCover}>
                {items?.map((item) => (
                    <img src={item.image} alt={item.title} />
                ))
                }
            </div>
        </div>
    )
}

export default MediaPage