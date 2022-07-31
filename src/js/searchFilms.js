import debounce from 'lodash.debounce';
import FetchFilms from './FetchFilms';
import getPagination from './pagination';
import { createMarkup } from './createMarkup';
const input = document.querySelector('#search-box');
const gallery = document.querySelector('.gallery');
//fetchFilms лучше назвать имя существительным
const fetchFilms = new FetchFilms();

input.addEventListener('input', debounce(searchFilms, 300));

//первый запрос при перезгрузке страницы популярных фильмов
searchFilms();

async function searchFilms() {
    // fetchFilms.page = 1;
    fetchFilms.query = input.value.trim();
    const data = await getData();

    const pagination = getPagination(data.total_results, 20);
    pagination.on('afterMove', nextPage);
}
async function nextPage(e) {
    fetchFilms.page = e.page;
    const data = await getData();
}
async function getData() {
    let data;
    try {
        data = fetchFilms.query
            ? await fetchFilms.fetchFilms()
            : await fetchFilms.fetchPopular();
        console.log(data);
        gallery.innerHTML = createMarkup(data.results);
        localStorage.setItem('LS', JSON.stringify(data.results));
    } catch (error) {
        console.log(error);
    }
    return data;
}
