import styles from "./Login.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

function Login() {
    const [nick, setNick] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            await login(nick, password);
            navigate("/profile");
        } catch (erro) {
            setMessage(erro.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className={styles.loginSection}>
            <h1>WorldScape</h1>

            <form onSubmit={handleLogin} className={styles.formLogin}>
                <div className={styles.options}>
                    <p>Login</p>
                    <p>Cadastro</p>
                </div>

                <div className={styles.loginInputs}>
                    <input type="text" value={nick} onChange={(event) => setNick(event.target.value)} placeholder="Nick" required />

                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Senha" required />
                </div>

                <div className={styles.loginHelp}>
                    <p>Lembrar de mim</p>
                    <p>Esqueceu a senha?</p>
                </div>

                <button type="submit" disabled={loading} className={styles['loginButton-enter']}>
                    {loading ? "Entrando..." : "Entrar"}
                </button>

                <div className={styles.divider}>
                    <span>ou</span>
                </div>

                <button className={styles['loginButton-create']}>
                    Criar conta
                </button>
            </form>

            {message && <p>{message}</p>}
        </section>
    )
}

export default Login;