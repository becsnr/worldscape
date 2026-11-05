import Profile from "../components/profile&login/Profile";
import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserItems } from "../services/users";
import { getBook, searchBooks } from "../services/books";

function Layout() {
    const { nick } = useParams();
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchItems() {
            try {
                const data = await getUserItems(nick.replace("@", ""));
                
                const itemsWithImg = await Promise.all(
                    data.map(async (item) => {
                        if (item.tipo === "livro") {
                            if (item.isbn) {
                                const livro = await getBook(item.isbn);

                                return {
                                    ...item,
                                    image: livro.image
                                };
                            }
                            
                            if (item.autor) {
                                const resultados = await searchBooks(item.titulo, item.autor);

                                return {
                                    ...item,
                                    image: resultados[0]?.image ?? null
                                };
                            }
                        }

                        return item;
                    })
                );

                setItems(itemsWithImg);

            } catch (erro) {
                console.error(erro);
            }
        }

        if (nick) {
            fetchItems();
        }
    }, [nick]);

    return (
        <>
            <Profile />

            <main>
                <Outlet context={{ items }} />
            </main>
        </>
    )
}

export default Layout;