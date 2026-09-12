import styles from "./Books.module.css";

import MediaPage from "../components/MediaPage";

function Books({ books }) {
    return (
        <MediaPage items={books} info={books.author} />
    )
}

export default Books