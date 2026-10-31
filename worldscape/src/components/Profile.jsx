import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import LoginButton from "./LoginButton";

function Profile() {
    const navigate = useNavigate();

    return (
        <header>
            <div className={styles.profileHeader}>
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
            </div>

            <LoginButton onClick={() => navigate("/login")} />
        </header>
    )
}

export default Profile;