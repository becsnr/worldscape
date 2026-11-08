import styles from "./CardMenu.module.css";
import stylesBtn from "./Buttons.module.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CardMenu({ size="normal", tipo, title }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { nick } = useParams();

    return (
        <div className={styles['cardMenu-container']}>
            <button className={`${styles['cardMenu-menu']} ${stylesBtn.btn} ${stylesBtn[`btn--${size}`]}`} onClick={() => setMenuOpen(!menuOpen)}>
                ⋮
            </button>

            {menuOpen && (
                <div className={styles['cardMenu-options']}>
                    <button onClick={() => {
                        navigate(`/${nick}/estante/${tipo}`, {
                            state: { title }
                        });
                        setMenuOpen(false);
                    }}>
                        Expandir estante
                    </button>

                    <button>Organização</button>
                </div>
            )}
        </div>
    );
}

export default CardMenu;