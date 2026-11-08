import styles from "./ExpandedShelf.module.css";

import { useParams, useOutletContext, useLocation } from "react-router-dom";
import Card from "../components/cards/Card";

// exibir todos os items da estante selecionada 
function ExpandedShelf() {
    const { tipo } = useParams();
    const { items } = useOutletContext();

    const shelfItems = items.filter(item => item.tipo === tipo);

    const location = useLocation();
    const title = location.state?.title;

    return (
        <div className={styles.expandedShelf}>
            <Card title={title} tipo={tipo} items={shelfItems} expanded={true} />
        </div>
    );
}

export default ExpandedShelf;