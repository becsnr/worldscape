export async function getBook(isbn) {
    const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);

    const data = await response.json();

    // console.log("ISBN:", isbn);
    // console.log("RESPOSTA DA API:", data);

    const book = data[`ISBN:${isbn}`];

    // console.log("LIVRO:", book);

    return {
        title: book?.title,
        author: book?.authors?.[0]?.name,
        image: book?.cover?.large
    }
}

export async function getBooks(books) {
    const results = await Promise.all(
        books.map((book) => getBook(book.isbn))
    );

    return results;
}

export async function searchBooks(query) {
    const response = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(query.trim())}&fields=key,title,author_name&limit=20`
    );

    if (!response.ok) {
        throw new Error("Não foi possível buscar os livros.");
    }

    const data = await response.json();

    const termo = query.trim().toLowerCase();

    const livros = data.docs.filter((book) => book.title?.toLowerCase().includes(termo));

    const resultados = await Promise.all(
        livros.map(async (book) => {
            try {
                const obraResponse = await fetch(
                    `https://openlibrary.org${book.key}.json`
                );

                if (!obraResponse.ok) {
                    throw new Error("Não foi possível buscar a obra.");
                }

                const obra = await obraResponse.json();
                const coverId = obra.covers?.find((id) => id > 0);

                return {
                    id: book.key,
                    title: book.title,
                    author: book.author_name?.[0] ?? "Autor desconhecido",
                    image: coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : null
                };
            } catch {
                return {
                    id: book.key,
                    title: book.title,
                    author: book.author_name?.[0] ?? "Autor desconhecido",
                    image: null
                };
            }
        })
    );

    return resultados;
}