const API_URL = "http://localhost:3000";

export async function login(nick, password) {
    const resposta = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nick: nick,
            password: password
        })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(dados.message || "Não foi possível fazer login.");
    }

    localStorage.setItem("token", dados.token);
    localStorage.setItem("nick", dados.nick);

    return dados;
}