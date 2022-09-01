import debounce from 'lodash.debounce';
import { Notify, Report } from 'notiflix';
import Delivery from './js/Delivery';
import getPagination from './js/pagination';
import initialFilter from './js/filter';
import initialMicrophone from './js/microphone';
import checkLogin from './js/autorization';
import createMarkup from './js/createMarkup';
import openModal from './js/openMovieInfo';
import openFooterModal from './js/about';
import loading from './js/loadingSpinner';

export const input = document.querySelector('#search-box');
const checkbox = document.querySelector('#genre_checkbox');
const gallery = document.querySelector('.gallery');
const container = document.querySelector('#tui-pagination-container');
const footerLink = document.querySelector('.footer__link');
const arrowUp = document.querySelector('.link__up');
export const delivery = new Delivery();

let sortBy = '';
let data;

window.addEventListener('scroll', showArrow);
gallery.addEventListener('click', openModal);
input.addEventListener('input', debounce(searchMovies, 300));
footerLink.addEventListener('click', openFooterModal);
initialFilter();
initialMicrophone();
checkLogin();
searchMovies();

export async function searchMovies() {
    delivery.query = input.value.trim();
    const data = await getData();
    let pagination;

    if (data.total_results > 20) {
        container.removeAttribute('style');
        pagination = getPagination(data.total_results, 20);
        pagination.on('afterMove', nextPage);
    } else {
        if (!data.total_results) {
            Report.failure(
                'Search result not successful &#9785 ',
                'Enter the correct movie name and try again.',
                'Okay',
                {
                    width: '400px',
                    svgSize: '100px',
                    titleFontSize: '20px',
                    messageFontSize: '18px',
                    buttonFontSize: '20px',
                    borderRadius: '10px',
                }
            );
        }
        container.setAttribute('style', 'display: none');
    }
}

function nextPage(event) {
    delivery.page = event.page;
    getData();
}

async function getData() {
    loading.show();
    try {
        if (checkbox.checked || delivery.year) {
            data = await delivery.filter();
            if (data.total_results > 10000) {
                data.total_results = 10000;
            }
        } else {
            data = delivery.query
                ? await delivery.search()
                : await delivery.getTrend();
        }
        if (sortBy) data.results.sort((a, b) => b[sortBy] - a[sortBy]);
        gallery.innerHTML = createMarkup(data.results);
        localStorage.setItem('gallery', JSON.stringify(data.results));
    } catch (error) {
        Notify.failure(error);
        console.log(error);
    }
    loading.close();
    return data;
}

export function setSortBy(param) {
    sortBy = param;
    data.results.sort((a, b) => b[sortBy] - a[sortBy]);
    gallery.innerHTML = createMarkup(data.results);
}

function showArrow() {
    if (window.pageYOffset < 100) arrowUp.classList.add('visually-hidden');
    else arrowUp.classList.remove('visually-hidden');
}
