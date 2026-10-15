const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export async function getMovie(title) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
    });

    const data = await response.json();

    // console.log("FILME:", title);
    // console.log("RESPOSTA:", data);

    const movie = data.results?.[0];

    return {
        title: movie?.title,
        image: movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null
    };
}

export async function getMovies(movies) {
    const results = await Promise.all(
        movies.map((movie) => getMovie(movie.title))
    );

    return results;
}

export async function searchMovies(query) {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=pt-BR`, 
        {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Não foi possível buscar os filmes.");
    }

    const data = await response.json();
    
    const termo = query.trim().toLowerCase();

    const resultados = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        year: movie.release_date?.slice(0, 4),
        image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
        correspondenciaExata: movie.title.trim().toLowerCase() === termo
    }));

    return resultados.sort(
        (a, b) => Number(b.correspondenciaExata) - Number(a.correspondenciaExata)
    );
}