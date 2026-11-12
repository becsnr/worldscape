import styles from "./CardMenu.module.css";
import stylesBtn from "./Buttons.module.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CardMenu({ size="normal", tipo, title, items, onStartSelecting }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [organizationOpen, setOrganizationOpen] = useState(false);
    const [selectingItem, setSelectingItem] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { nick } = useParams();

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles['cardMenu-container']} ref={menuRef}>
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

                    <button onClick={() => setOrganizationOpen(!organizationOpen)}>
                        Organização &gt;
                    </button>

                    {organizationOpen && (
                        <div>
                            <button>Mover de lugar</button>
                            <button onClick={() => {
                                onStartSelecting();
                                setMenuOpen(false);
                                setOrganizationOpen(false);
                            }}>
                                Remover da estante
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CardMenu;