const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export async function getSerie(title) {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(title)}`,
        {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        }
    );

    const data = await response.json();

    const serie = data.results?.[0];

    return {
        title: serie?.name,
        image: serie?.poster_path
            ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
            : null
    };
}

export async function getSeries(series) {
    const results = await Promise.all(
        series.map((serie) => getSerie(serie.title))
    );

    return results;
}

export async function searchSeries(query) {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}&language=pt-BR`, 
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

    const resultados = data.results.map((serie) => ({
        id: serie.id,
        title: serie.name,
        year: serie.first_air_date?.slice(0, 4),
        image: serie.poster_path ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : null,
        correspondenciaExata: serie.name.trim().toLowerCase() === termo
    }));

    return resultados.sort(
        (a, b) => Number(b.correspondenciaExata) - Number(a.correspondenciaExata)
    );
}