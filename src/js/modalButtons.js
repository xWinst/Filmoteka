let currentLi, userData;

export default async function renderModalButtons(item) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const watchedControl = document.querySelector('.js-addtowatched');
    const queueControl = document.querySelector('.js-addtoqueue');
    watchedControl.addEventListener('click', changeList);
    queueControl.addEventListener('click', changeList);
    currentLi = item;

    if (user) {
        userData = (await dataBase.readUserData(user.uid)) || {};
        listWatched = userData.watched || [];
        listQueue = userData.queue || [];
    } else {
        listWatched = JSON.parse(localStorage.getItem('watched')) || [];
        listQueue = JSON.parse(localStorage.getItem('queue')) || [];
    }

    const indexWatched = listWatched.findIndex(
        ({ id }) => id === Number(item.id)
    );
    const indexQueue = listQueue.findIndex(({ id }) => id === Number(item.id));

    watchedControl.textContent =
        indexWatched === -1 ? 'add to watched' : 'remove from watched';
    queueControl.textContent =
        indexQueue === -1 ? 'add to queue' : 'remove from queue';
}

async function changeList(event) {
    const btn = event.target;
    const user = JSON.parse(sessionStorage.getItem('user'));
    userData = (user ? await dataBase.readUserData(user.uid) : null) || {};
    const visibleGallery = JSON.parse(localStorage.getItem('gallery'));
    const listFilm = user
        ? userData[btn.name] || []
        : JSON.parse(localStorage.getItem(btn.name)) || [];
    const index = listFilm.findIndex(({ id }) => id === Number(currentLi.id));
    if (index === -1) {
        listFilm.push(visibleGallery[currentLi.dataset.index]);
        btn.textContent = `remove from ${btn.name}`;
    } else {
        listFilm.splice(index, 1);
        btn.textContent = `add to ${btn.name}`;
    }

    if (user) {
        userData[btn.name] = listFilm;
        dataBase.writeUserData(
            user.uid,
            userData.watched || [],
            userData.queue || []
        );
    } else localStorage.setItem(btn.name, JSON.stringify(listfilm));
}
