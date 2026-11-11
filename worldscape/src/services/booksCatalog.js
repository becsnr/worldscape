const API_URL = "http://localhost:3000";

// buscar todos os livros do catálogo compartilhado
export async function getBooksFromCatalog() {
    const resposta = await fetch(`${API_URL}/booksCatalog`);

    if (!resposta.ok) {
        throw new Error("Não foi possível buscar os livros do catálogo.");
    }

    const livros = await resposta.json();

    return livros;
}

// pesquisar livros já cadastrados 
export async function searchBooksInCatalog(query) {
    const livros = await getBooksFromCatalog();

    const normalizar = (texto) =>
        texto.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

    const termo = normalizar(query);

    return livros.filter((livro) => normalizar(livro.titulo).includes(termo)).map((livro) => ({
        id: `catalog-${livro.id}`,
        title: livro.titulo,
        author: livro.autor,
        image: livro.capa,
        isbn: livro.isbn,
        source: "catalog"
    }));
}