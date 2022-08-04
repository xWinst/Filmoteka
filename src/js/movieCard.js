import svg from '../images/icons.svg';

export default function movieCard({
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
    <div class="modal">
                <button type="button" class="modal__close-btn" data-modal-close>
                    <svg class="modal__close-icon" width="16" height="16">
                        <use href="${svg}#icon-close"></use>
                    </svg>
                </button>

                <div class="modal__content">
                    <img class="modal__img" src="${posterUrl}" alt="${title}"/>
                    <div class="modal__text">
                        <h2 class="modal__title">${title}</h2>
                        <div class="modal__figures">
                            <ul class="modal__properties list">
                                <li>Vote / Votes</li>
                                <li>Popularity</li>
                                <li>Original Title</li>
                                <li>Genre</li>
                            </ul>
                            <ul class="modal__values list">
                                <li><span class="modal__vote-average">${vote_average.toFixed(
                                    1
                                )}</span> / <span class="modal__vote-count">${vote_count}</span></li>
                                <li>${popularity.toFixed(1)}</li>
                                <li class="modal__title-original">${original_title}</li>
                                <li>${genres.join(', ')}</li>
                            </ul>
                        </div>
                        <h3 class="modal__about--title">ABOUT</h3>
                        <button type="button" class="modal__watch-button js-playtrailer">
                            <svg class="modal__play-icon" width="21" height="15">
                                <use href="${svg}#icon-play"></use>
                            </svg>
                            Watch trailer
                        </button>
                        <p class="modal__about--text">${overview}</p>
                        <div class="btns">
                            <button type="button" class="btns__button--modal js-addtowatched" name ="watched"></button>
                            <button type="button" class="btns__button--modal js-addtoqueue" name = "queue"></button>
                        </div>
                    </div>
                </div>
            </div>`;
}
