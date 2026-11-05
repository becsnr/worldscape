export async function getBook(isbn) {
    const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);

    const data = await response.json();

    const book = data[`ISBN:${isbn}`];

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

export async function searchBooks(query, autor = null) {
    const termo = query.trim().toLowerCase();

    const response = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(termo)}&fields=key,title,author_name,isbn&limit=20`
    );

    if (!response.ok) {
        throw new Error("Não foi possível buscar os livros.");
    }

    const data = await response.json();

    const normalizar = (texto) => texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

    const correspondeAoLivro = (livro, titulo, autor) => {
        return (
            normalizar(livro.title) === normalizar(titulo) && livro.author_name?.some(
                (nome) => normalizar(nome) === normalizar(autor)
            )
        );
    };

    const livros = autor ? data.docs.filter((book) => 
        correspondeAoLivro({
            title: book.title,
            author_name: book.author_name
        },
        query,
        autor
        )
    ) : data.docs.filter((book) =>
        normalizar(book.title).includes(normalizar(termo))
    );

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
                    author: book.author_name?.[0] ?? null,
                    isbn: book.isbn?.[0] ?? null,
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

    return resultados.filter((livro) => livro.image !== null).slice(0, 5);
}