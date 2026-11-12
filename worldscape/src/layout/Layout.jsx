import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

import Profile from "../components/profile&login/Profile";

import { getUserItems } from "../services/users";
import { getBook, searchBooks } from "../services/books";
import { getMovie } from "../services/movies";
import { getSerie } from "../services/series";
import { deleteItem } from "../services/itemsService";

function Layout() {
    const { nick } = useParams();
    const [items, setItems] = useState([]);

    const refreshItems = useCallback(async () => {
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

                        if (
                            item.tipo === "filme" ||
                            item.tipo === "serie" ||
                            item.tipo === "anime"
                        ) {
                            let resultado;

                            if (item.tipo === "filme") {
                                resultado = await getMovie(item.titulo);
                            } else {
                                resultado = await getSerie(item.titulo);
                            }

                            return {
                                ...item,
                                image: resultado.image
                            };
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

    const handleDeleteItem = useCallback(async (id) => {
        try {
            await deleteItem(id);
            await refreshItems();
        } catch (erro) {
            console.error(erro);
        }
    }, [refreshItems]);

    useEffect(() => {
        if (nick) {
            refreshItems();
        }
    }, [nick, refreshItems]);

    return (
        <>
            <Profile />

            <main>
                <Outlet context={{ items, refreshItems, handleDeleteItem }} />
            </main>
        </>
    )
}

export default Layout;