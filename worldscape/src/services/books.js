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