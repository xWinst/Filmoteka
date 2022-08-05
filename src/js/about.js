import * as basicLightbox from 'basiclightbox';
import icons from '../images/icons.svg';
import summary from '../images/summary.jpg';

export default function openFooterModal(event) {
    event.preventDefault();
    const modal = basicLightbox.create(
        /*HTML*/
        `<div class="modal modal--size">
                <button type="button" class="modal__close-btn">
                    <svg class="modal__close-icon" width="16" height="16">
                        <use href="${icons}#icon-close"></use>
                    </svg>
                </button>
                <div class="modal__thumb">
                    <img src=${summary} alt="summary" />
                    <a class="modal__link" href="https://drive.google.com/file/d/1s3y5V2kmKf7VmqztW3UD3w9kaO2rQLz7/view?usp=sharing">Go to resume</a>
                </div>          
            </div>
        </div> `,
        {
            onShow: () => window.addEventListener('keydown', closeByESC),
            onClose: () => window.removeEventListener('keydown', closeByESC),
        }
    );
    modal.show();
    const closeBtn = document.querySelector('.modal__close-btn');
    closeBtn.addEventListener('click', () => {
        modal.close();
    });
}

function closeByESC(event) {
    if (event.key === 'Escape') {
        modal.close();
    }
}
