import genres from '../genres.json';
import { delivery, searchMovies, setSortBy } from '../index';

const genreChoice = document.querySelector('#genre_choice');
const yearChoice = document.querySelector('#year_choice');
const sortChoice = document.querySelector('#sort_choice');
const filter = document.querySelectorAll('.filter__input');
const gallery = document.querySelector('.gallery');
const searchBox = document.querySelector('.header__search');
const checkbox = document.querySelector('#genre_checkbox');

export default function initialFilter() {
    filter.forEach(item => item.addEventListener('change', changeFilter));
    renderGenreMenu();
    yearMenu();
    selectTypeQuery();
    checkbox.addEventListener('change', selectTypeQuery);
}

function renderGenreMenu() {
    const genresKey = Object.keys(genres);
    const genresList = [];
    for (const key of genresKey) {
        genresList.push(`<option value="${key}">${genres[key]}</option>`);
    }
    genreChoice.insertAdjacentHTML('beforeend', genresList.join(''));
}

function yearMenu() {
    let startYear = 1969;
    let currentYear = new Date().getFullYear();
    let years = [];

    yearChoice.insertAdjacentHTML(
        'beforeend',
        '<option value="">Choose year</option>'
    );
    for (let i = currentYear; i > startYear; i -= 1) {
        years.push(`<option value="${i}">${i}</option>`);
    }
    yearChoice.insertAdjacentHTML('beforeend', years.join(''));
}

async function changeFilter(event) {
    if (event.target.name === 'sort') {
        setSortBy(event.target.value);
        return;
    }
    delivery[event.target.name] = event.target.value;
    searchMovies();
}

function selectTypeQuery() {
    if (checkbox.checked) {
        searchBox.setAttribute('style', 'opacity: 0');
        genreChoice.removeAttribute('style');
    } else {
        genreChoice.setAttribute('style', 'opacity: 0');
        searchBox.removeAttribute('style');
    }
}
