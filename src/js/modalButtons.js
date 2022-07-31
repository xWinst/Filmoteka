let addWatchedModal, addQueueModal;
let currentLi;

function addRemoveLibraryFilm(event) {
    // опеределяем кна какую кнопку нажали
    const btn = event.target;
    // на странице
    const filmListOnHomePage = JSON.parse(localStorage.getItem('LS'));
    const listfilm = JSON.parse(localStorage.getItem(btn.name)) || [];
    const index = listfilm.findIndex(
        ({ id }) => id === Number(currentLi.dataset.id)
    );
    if (index === -1) {
        listfilm.push(filmListOnHomePage[currentLi.id]);
        btn.textContent = `remove from ${btn.name}`;
    } else {
        listfilm.splice(index, 1);
        btn.textContent = `add to ${btn.name}`;
    }
    localStorage.setItem(btn.name, JSON.stringify(listfilm));
}

export function renderModalButtons(item) {
    addWatchedModal = document.querySelector('.js-addtowatched');
    addQueueModal = document.querySelector('.js-addtoqueue');
    addWatchedModal.addEventListener('click', addRemoveLibraryFilm);
    addQueueModal.addEventListener('click', addRemoveLibraryFilm);
    currentLi = item;

    // в библиотеке
    const listWatched = JSON.parse(localStorage.getItem('watched')) || [];
    const listQueue = JSON.parse(localStorage.getItem('queue')) || [];
    //сравнили есть ли в библиотеке
    const indexWatched = listWatched.findIndex(
        ({ id }) => id === Number(item.dataset.id)
    );
    const indexQueue = listQueue.findIndex(
        ({ id }) => id === Number(item.dataset.id)
    );

    //переписали название кнопок
    addWatchedModal.textContent =
        indexWatched === -1 ? 'add to watched' : 'remove from watched';
    addQueueModal.textContent =
        indexQueue === -1 ? 'add to queue' : 'remove from queue';
}
