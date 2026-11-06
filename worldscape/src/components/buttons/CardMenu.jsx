import styles from "./CardMenu.module.css";
import stylesBtn from "./Buttons.module.css";
import { useState } from "react";

function CardMenu({ size="normal" }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className={styles['cardMenu-container']}>
            <button className={`${styles['cardMenu-menu']} ${stylesBtn.btn} ${stylesBtn[`btn--${size}`]}`} onClick={() => setMenuOpen(!menuOpen)}>
                ⋮
            </button>

            {menuOpen && (
                <div className={styles['cardMenu-options']}>
                    <button>Expandir estante</button>
                    <button>Organização</button>
                </div>
            )}
        </div>
    );
}

export default CardMenu;