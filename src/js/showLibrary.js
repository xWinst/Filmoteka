import { createMarkup } from './createMarkup';
import getPagination from './pagination';

const wachedBtn = document.querySelector('.js-watched');
const queueBtn = document.querySelector('.js-queue');
const gallery = document.querySelector('.gallery');
let pagination;
// const activeBtn = localStorage.getItem('Active') || 'wached';
renderGallery();
// кликнули на кнопку, вызов события клик на кнопки в зависимости от того какая имеет класс "active"
function renderGallery() {
    if (wachedBtn) {
        wachedBtn.addEventListener('click', showLibrary);
        queueBtn.addEventListener('click', showLibrary);
        if (localStorage.getItem('Active') === 'queue') {
            queueBtn.dispatchEvent(new Event('click'));
        } else {
            wachedBtn.dispatchEvent(new Event('click'));
        }
    }
}

function showLibrary(event) {
    wachedBtn.classList.remove('active');
    queueBtn.classList.remove('active');
    event.target.classList.add('active');

    localStorage.setItem('Active', event.target.name);
    const libraryList = JSON.parse(localStorage.getItem(event.target.name));
    // gallery.innerHTML = createMarkup(libraryList);
    const perPage = getPerPage();
    pagination = getPagination(libraryList.length, perPage);
    let visibleList;

    pagination.on('afterMove', event => {
        visibleList = libraryList.slice(
            event.page * perPage - perPage,
            event.page * perPage
        );
        gallery.innerHTML = createMarkup(visibleList);
        localStorage.setItem('LS', JSON.stringify(visibleList));
        sessionStorage.setItem('Page', event.page);
    });
    moveToPage(1);
    // const savePage = sessionStorage.getItem('Page') || 1;
    // pagination.movePageTo(savePage);
    // sessionStorage.removeItem('Page');
}
export function moveToPage(page) {
    if (pagination) pagination.movePageTo(page);
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
