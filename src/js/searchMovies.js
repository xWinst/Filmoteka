import debounce from 'lodash.debounce';
import Delivery from './Delivery';

const delivery = new Delivery();
const search = document.querySelector('#search-box');
search.addEventListener('input', debounce(searchMovies, 500));

async function searchMovies() {
    if (instance) {
        instance.reset();
    }

    container.removeAttribute('style');
    const query = search.value.trim();
    delivery.query = query;
    const data = await getMovies();
    if (data.total_results) {
        instance = getPagination(data.total_results, 20);
        instance.on('afterMove', loadPage);
    } else {
        container.setAttribute('style', 'display: none');
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
}

async function getMovies() {
    loading.show();
    let data;

    try {
        data = delivery.query
            ? await delivery.search()
            : await delivery.trend();
        const markup = createMarkup(data.results);
        listRef.innerHTML = markup;
    } catch (error) {
        console.log('ERROR = ', error);
    }
    loading.close();

    return data;
}
