import styles from "./FilterHeader.module.css"
import FilterButton from "./FilterButton";
import AddButton from "../buttons/AddButton";

function FilterHeader({ onAddClick }) {
    return (
        <header className={styles.filterHeader}>
            <FilterButton />

            <AddButton onClick={onAddClick} />
        </header>
    );
}

export default FilterHeader;