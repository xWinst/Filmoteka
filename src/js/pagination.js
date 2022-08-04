import Pagination from 'tui-pagination';
const container = document.querySelector('#tui-pagination-container');
export default function getPagination(totalFilms, perPage) {
    const options = {
        totalItems: totalFilms,
        itemsPerPage: perPage,
        visiblePages: 5,
        centerAlign: true,
    };
    return new Pagination(container, options);
}
