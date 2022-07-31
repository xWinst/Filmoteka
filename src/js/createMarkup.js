import genres from '../genres.json';
import poster from '../images/noposter.jpg';
export function createMarkup(data) {
    return data
        .map((fullFilmInfo, index) => {
            const { genre_ids, title, release_date, poster_path, id } =
                fullFilmInfo;
            const allGenres = genre_ids.map(id => getGenres(id));
            if (genres.length > 2) {
                genres = `${allGenres[0]}, ${allGenres[1]}, Other`;
            }
            let posterUrl;
            if (!poster_path) {
                posterUrl = poster;
            } else {
                posterUrl = `https://image.tmdb.org/t/p/original/${poster_path}`;
            }
            fullFilmInfo.genres = allGenres;
            fullFilmInfo.posterUrl = posterUrl;
            return /*html*/ `
            <li class="list__item" id="${index}" data-id='${id}'>
                <img src="${posterUrl}" alt="" class="list__img" loading = "lazy" />
                <div class="list__text">
                    <h2 class="list__title">${title}</h2>
                    <p class="list__genre">${genres} | ${release_date.slice(
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
