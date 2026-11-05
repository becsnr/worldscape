import styles from "./LoginButton.module.css"

function LoginButton({ onClick }) {
    return (
        <>
            <button type="button" onClick={onClick}>
                login
            </button>
        </>
    )
}

export default LoginButton;