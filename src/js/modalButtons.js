let currentLi;

function changeList(event) {
    const btn = event.target;
    const visibleGallery = JSON.parse(localStorage.getItem('gallery'));
    const listfilm = JSON.parse(localStorage.getItem(btn.name)) || [];
    const index = listfilm.findIndex(({ id }) => id === Number(currentLi.id));
    if (index === -1) {
        listfilm.push(visibleGallery[currentLi.dataset.index]);
        btn.textContent = `remove from ${btn.name}`;
    } else {
        listfilm.splice(index, 1);
        btn.textContent = `add to ${btn.name}`;
    }

    localStorage.setItem(btn.name, JSON.stringify(listfilm));
}

export function renderModalButtons(item) {
    const watchedControl = document.querySelector('.js-addtowatched');
    const queueControl = document.querySelector('.js-addtoqueue');
    watchedControl.addEventListener('click', changeList);
    queueControl.addEventListener('click', changeList);
    currentLi = item;

    const listWatched = JSON.parse(localStorage.getItem('watched')) || [];
    const listQueue = JSON.parse(localStorage.getItem('queue')) || [];
    const indexWatched = listWatched.findIndex(
        ({ id }) => id === Number(item.id)
    );
    const indexQueue = listQueue.findIndex(({ id }) => id === Number(item.id));

    watchedControl.textContent =
        indexWatched === -1 ? 'add to watched' : 'remove from watched';
    queueControl.textContent =
        indexQueue === -1 ? 'add to queue' : 'remove from queue';
}
