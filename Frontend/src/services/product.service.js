import axios from 'axios';
import store from '../store'
import main from '@/main';

const url = import.meta.env.VITE_APP_API_URL;

class ProductService {
    constructor() {
        this.baseUrl = `${url}/api/products`;
        this.api = axios.create({
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        this.api.interceptors.request.use((config) => {
			const uid = store.getters.uid;
            const token = store.getters.token;
			if (uid && token) {
				config.headers.authorization = `Bearer ${token}`;
			}
			return config;
		});

		this.api.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				if (error.response.status == 401) {

                    // store.dispatch('uid', null);
                    // store.dispatch('utype', '');
                    // store.dispatch('token', '');
					main.$router.push({ name: 'login' });
				}
				return error;
			}
		);

        this.ImageApi = axios.create({
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
            },
        });

        this.ImageApi.interceptors.request.use((config) => {
			const uid = store.getters.uid;
            const token = store.getters.token;
			if (uid && token) {
				config.headers.authorization = `Bearer ${token}`;
			}
			return config;
		});

		this.ImageApi.interceptors.response.use(
			(response) => {
				return response;
			},
			(error) => {
				if (error.response.status == 401) {

                    // store.dispatch('uid', null);
                    // store.dispatch('utype', '');
                    // store.dispatch('token', '');
					main.$router.push({ name: 'login' });
				}
				return error;
			}
		);

    }

    async getMany() {
        return (await this.api.get(this.baseUrl)).data;
    }

    async create(product) {
        return (await this.ImageApi.post(this.baseUrl, product)).data;
    }

    async update(id, product) {
        return (await this.ImageApi.put(`${this.baseUrl}/${id}`, product)).data;
    }

    async deleteMany() {
        return (await this.api.delete(this.baseUrl)).data;
    }
    
    async get(id) {
        return (await this.api.get(`${this.baseUrl}/${id}`)).data;
    }
    
    async delete(id) {
        return (await this.api.delete(`${this.baseUrl}/${id}`)).data;
    }
}

export const productService = new ProductService();
