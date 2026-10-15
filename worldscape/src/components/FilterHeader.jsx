import styles from "./FilterHeader.module.css"
import FilterButton from "./FilterButton";
import AddButton from "./AddButton";

function FilterHeader() {
    return (
        <header className={styles.filterHeader}>
            <FilterButton />

            <AddButton />
        </header>
    )
}

export default FilterHeader;