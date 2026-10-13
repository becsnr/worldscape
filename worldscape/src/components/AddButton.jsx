import styles from "./AddButton.module.css"

function AddButton({ onClick, size="normal" }) {
    return (
        <button
            type="button"
            className={`${styles.addButton} ${styles[`addButton--${size}`]}`}
            onClick={onClick}
            aria-label="Adicionar item"
        >
            +
        </button>
    );
}

export default AddButton;