import styles from "./AddButton.module.css";
import stylesBtn from "./Buttons.module.css";

function AddButton({ onClick, size="normal" }) {
    return (
        <button
            type="button"
            className={`${styles.addButton} ${stylesBtn.btn} ${stylesBtn[`btn--${size}`]}`}
            onClick={onClick}
            aria-label="Adicionar item"
        >
            +
        </button>
    )
}

export default AddButton;