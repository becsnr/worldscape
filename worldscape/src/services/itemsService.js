const API_URL = "http://localhost:3000";

// add items no catálogo/estante
export async function addItemToCollection(titulo, tipo, isbn = null, autor = null) {
    const token = localStorage.getItem("token");

    const resposta = await fetch(`${API_URL}/itemsUsers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ titulo, tipo, isbn,autor })
    });

    if (!resposta.ok) {
        const erro = await resposta.json();
        throw new Error(erro.message);
    }

    return await resposta.json();
}