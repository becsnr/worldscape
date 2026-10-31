import styles from "./Profile.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserByNick } from "../services/users";

import Navbar from "./Navbar";
import LoginButton from "./LoginButton";

function Profile() {
    const navigate = useNavigate();
    const { nick } = useParams();

    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchUser() {
            try {
                const data = await getUserByNick(nick.replace("@", ""));
                setUser(data);
            } catch (erro) {
                setError(erro.message);
            }
        }

        fetchUser();
    }, [nick]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!user) {
        return <p>Carregando perfil...</p>;
    }

    return (
        <header>
            <div className={styles.profileHeader}>
                <div className={styles.profileContainer}>
                    <div className={styles.icon}>
                    </div>
                    <div className={styles.profileData}>
                        <div className={styles.nick}>
                            <p>{user.nick}</p>
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