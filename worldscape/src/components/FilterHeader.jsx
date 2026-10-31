import styles from "./FilterHeader.module.css"
import FilterButton from "./FilterButton";
import AddButton from "./AddButton";

function FilterHeader({ onAddClick }) {
    return (
        <header className={styles.filterHeader}>
            <FilterButton />

            <AddButton onClick={onAddClick} />
        </header>
    );
}

export default FilterHeader;