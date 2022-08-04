import { createMarkup } from './js/createMarkup';
import getPagination from './js/pagination';
import { openModal } from './js/openMovieInfo';

const wachedBtn = document.querySelector('.js-watched');
const queueBtn = document.querySelector('.js-queue');
const gallery = document.querySelector('.gallery');
const сontainer = document.querySelector('#tui-pagination-container');

document.body.addEventListener('close', rerender);
gallery.addEventListener('click', openModal);
pageInit();

function pageInit() {
    if (window.location.pathname === '/index.html') return;
    sessionStorage.setItem('window', 'library');
    wachedBtn.addEventListener('click', showLibrary);
    queueBtn.addEventListener('click', showLibrary);
    if (localStorage.getItem('currentLibrary') === 'queue') {
        queueBtn.dispatchEvent(new Event('click'));
    } else {
        wachedBtn.dispatchEvent(new Event('click'));
    }
}

function showLibrary(event) {
    wachedBtn.classList.remove('active');
    queueBtn.classList.remove('active');
    event.target.classList.add('active');
    localStorage.setItem('currentLibrary', event.target.name);

    renderLibary(1);
}

function rerender() {
    renderLibary(sessionStorage.getItem('currentPage'));
}

function renderLibary(currentPage) {
    const currentLibrary = localStorage.getItem('currentLibrary');
    const libraryList = JSON.parse(localStorage.getItem(currentLibrary)) || [];
    const perPage = getPerPage();
    const pagination = getPagination(libraryList.length, perPage);
    let visibleList;

    pagination.on('afterMove', event => {
        сontainer.removeAttribute('style');
        if (libraryList.length <= perPage) {
            if (event.page === 2) {
                pagination.movePageTo(1);
                return;
            }
            сontainer.setAttribute('style', 'display: none');
        }
        visibleList = libraryList.slice(
            event.page * perPage - perPage,
            event.page * perPage
        );
        gallery.innerHTML = createMarkup(visibleList);
        localStorage.setItem('gallery', JSON.stringify(visibleList));
        sessionStorage.setItem('currentPage', event.page);
    });
    pagination.movePageTo(currentPage);
}

function getPerPage() {
    let perPage;
    if (window.innerWidth >= 1280) {
        perPage = 9;
    } else if (window.innerWidth >= 768) {
        perPage = 8;
    } else perPage = 4;
    return perPage;
}
