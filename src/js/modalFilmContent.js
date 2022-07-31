import svg from '../images/icons.svg';

export function modalFilmContent({
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    overview,
    genres,
    posterUrl,
}) {
    return /*HTML*/ `
    <div class="movies-modal">
                <button type="button" class="movies-modal__close-btn" data-modal-close>
                    <svg class="movies-modal__close-icon" width="16" height="16">
                        <use href="${svg}#icon-close"></use>
                    </svg>
                </button>

                <div class="movie-modal__content">
                    <img class="movie-modal__img" src="${posterUrl}" alt="${title}"/>
                    <div class="movie-modal__text">
                        <h2 class="movie-modal__title">${title}</h2>
                        <div class="movie-modal__figures">
                            <ul class="movie-modal__properties list">
                                <li>Vote / Votes</li>
                                <li>Popularity</li>
                                <li>Original Title</li>
                                <li>Genre</li>
                            </ul>
                            <ul class="movie-modal__values list">
                                <li><span class="movie-modal__vote-average">${vote_average.toFixed(
                                    1
                                )}</span> / <span class="movie-modal__vote-count">${vote_count}</span></li>
                                <li>${popularity.toFixed(1)}</li>
                                <li class="movie-modal__title-original">${original_title}</li>
                                <li>${genres.join(', ')}</li>
                            </ul>
                        </div>
                        <h3 class="movie-modal__about--title">ABOUT</h3>
                        <button type="button" class="modal__watch-button js-playtrailer">
                            <svg class="movies-modal__play-icon" width="14" height="14">
                                <use href="${svg}#icon-play"></use>
                            </svg>
                            <span>Watch trailer</span>
                        </button>
                        <p class="movie-modal__about--text">${overview}</p>
                        <div class="modal__btns">
                        <button type="button" class="modal__btns__button js-addtowatched" name ="watched">add to watched</button>
                        <button type="button" class="modal__btns__button js-addtoqueue" name = "queue">add to queue</button>
                        </div>
                    </div>
                </div>
            </div>`;
}
