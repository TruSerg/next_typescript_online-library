import axios from 'axios';

import { API_KEY } from '../const';

const baseURL = 'https://www.googleapis.com/books/v1/volumes';

const config = {
	baseURL,
};

const api = axios.create(config);

api.interceptors.request.use(config => {
	config.url = config.url + `&key=${API_KEY}`;

	return config;
});

export default api;
