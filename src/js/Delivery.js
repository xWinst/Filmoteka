import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = 'ba6eefe67f978283c5f8594635575ba8';

export default class Delivery {
    #query = '';
    page = 1;
    genre = '';
    year = '';

    set query(newQuery) {
        this.page = 1;
        this.#query = newQuery;
    }

    get query() {
        return this.#query;
    }

    async search() {
        return await this.#fetch('search/movie');
    }

    async getTrend() {
        return await this.#fetch('trending/movie/week');
    }

    async getTrailer(id) {
        return await this.#fetch(`movie/${id}/videos`);
    }

    async filter() {
        return await this.#fetch(`discover/movie`);
    }

    async #fetch(typeRequest) {
        const response = await axios.get(typeRequest, {
            params: {
                api_key: API_KEY,
                query: this.#query,
                page: this.page,
                primary_release_year: this.year,
                with_genres: this.genre,
            },
        });
        return response.data;
    }
}
