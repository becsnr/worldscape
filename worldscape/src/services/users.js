const API_URL = "http://localhost:3000";

// BUSCA DE PERFIL
export async function getUserByNick(nick) {
    const resposta = await fetch(`${API_URL}/users/${nick}`);

    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(dados.message || "Usuário não encontrado.");
    }

    return dados;
}