import styles from "./Profile.module.css";

import Navbar from "./Navbar";

function Profile() {
    return (
        <header>
            <div className={styles.profileContainer}>
                <div className={styles.icon}>

                </div>

                <div className={styles.profileData}>
                    <div className={styles.nick}>
                        <p>beca</p>
                    </div>
                    
                    <div className={styles.bio}>
                        <p>apenas uma diva que vive divagando</p>
                    </div>
                </div>
            </div>

            <Navbar />
        </header>
    )
}

export default Profile