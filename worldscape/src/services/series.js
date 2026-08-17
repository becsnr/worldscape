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

    // console.log("SÉRIE:", title);
    // console.log("RESPOSTA:", data);

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