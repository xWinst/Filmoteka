import genres from '../genres.json';
import poster from '../images/noposter.jpg';
export default function createMarkup(listMovie) {
    return listMovie
        .map((movieData, index) => {
            const {
                genre_ids = [],
                title,
                release_date = '',
                poster_path,
                id,
            } = movieData;
            const allGenres = genre_ids.map(id => getGenres(id));
            const genres =
                allGenres.length > 2
                    ? `${allGenres[0]}, ${allGenres[1]}, Other`
                    : allGenres.join(', ');
            const posterUrl = poster_path
                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                : poster;
            movieData.genres = allGenres;
            movieData.posterUrl = posterUrl;
            return /*html*/ `
        <li class="list__item" id="${id}" data-index='${index}'>
            <img src="${posterUrl}" alt="poster" class="list__img" loading = "lazy" />
            <div class="list__description">
                <h2 class="list__title">${title}</h2>
                <p class="list__text">${genres} | ${release_date.slice(
                0,
                4
            )}</p>
            </div>
        </li>`;
        })
        .join('');
}
function getGenres(id) {
    return genres[id];
}
