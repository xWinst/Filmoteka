import debounce from 'lodash.debounce';
import { Notify, Report } from 'notiflix';
import Delivery from './js/Delivery';
import getPagination from './js/pagination';
import initialFilter from './js/filter';
import initialMicrophone from './js/microphone';
import checkLogin from './js/autorization';
import createMarkup from './js/createMarkup';
import openModal from './js/openMovieInfo';

export const input = document.querySelector('#search-box');
const gallery = document.querySelector('.gallery');
const container = document.querySelector('#tui-pagination-container');
export const delivery = new Delivery();

gallery.addEventListener('click', openModal);
input.addEventListener('input', debounce(searchMovies, 300));
initialFilter();
initialMicrophone();
checkLogin();
searchMovies();

async function searchMovies() {
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

function nextPage(e) {
    delivery.page = e.page;
    getData();
}
async function getData() {
    let data;
    try {
        data = delivery.query
            ? await delivery.search()
            : await delivery.getTrend();
        gallery.innerHTML = createMarkup(data.results);
        localStorage.setItem('gallery', JSON.stringify(data.results));
    } catch (error) {
        Notify.failure(error);
        console.log(error);
    }
    console.log(data);
    return data;
}
