import * as basicLightBox from 'basiclightbox';
import Delivery from './Delivery';
import { movieCard } from './movieCard';
import { renderModalButtons } from './modalButtons';
import { Notify } from 'notiflix';

const delivery = new Delivery();
let modalWindow;
let item;

export function openModal(event) {
    const node = event.target.parentNode;
    if (node.nodeName === 'LI') {
        item = node;
    } else if (node.parentNode.nodeName === 'LI') {
        item = node.parentNode;
    } else return;

    const visibleGallery = JSON.parse(localStorage.getItem('gallery'));

    modalWindow = basicLightBox.create(
        movieCard(visibleGallery[item.dataset.index]),
        {
            onShow: () => {
                document.body.setAttribute('style', 'overflow: hidden');
                document.addEventListener('keydown', closeModalByESC);
            },
            onClose: () => {
                document.body.removeAttribute('style');
                document.removeEventListener('keydown', closeModalByESC);
                document.body.dispatchEvent(new Event('close'));
            },
        }
    );

    modalWindow.show();

    const closeCross = document.querySelector('[data-modal-close]');
    const trailerBTN = document.querySelector('.js-playtrailer');
    closeCross.addEventListener('click', closeModal);
    trailerBTN.addEventListener('click', playTrailer);

    renderModalButtons(item);
}

async function playTrailer() {
    const data = await delivery.getTrailer(item.id);
    const movieTrailer = data.results.find(
        video => video.type === 'Trailer' && video.site === 'YouTube'
    );
    if (movieTrailer) {
        const modal = basicLightBox.create(`<iframe width="560" height="315" 
        src="https://www.youtube.com/embed/${movieTrailer.key}" 
        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>
      `);
        modal.show();
    } else Notify.failure('Trailer is not avaleble');
}

function closeModal() {
    modalWindow.close();
}

function closeModalByESC(event) {
    if (event.key === 'Escape') {
        modalWindow.close();
    }
}
