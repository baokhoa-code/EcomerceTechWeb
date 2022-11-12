import axios from 'axios';
import store from '../store';
import main from '@/main';

const url = import.meta.env.VITE_APP_API_URL;

class UserService {
    constructor() {
        this.baseUrl = `${url}/api/users`;
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
    }

    async login(payload) {
        return (await this.api.post(`${this.baseUrl}/login`,payload)).data;
    }

    async getMany() {
        return (await this.api.get(this.baseUrl)).data;
    }

    async create(user) {
        return (await this.api.post(this.baseUrl, user)).data;
    }
    
    async deleteMany() {
        return (await this.api.delete(this.baseUrl)).data;
    }
    
    async get(id) {
        return (await this.api.get(`${this.baseUrl}/${id}`)).data;
    }
    
    async update(id, user) {
        return (await this.api.put(`${this.baseUrl}/${id}`, user)).data;
    }
    
    async delete(id) {
        return (await this.api.delete(`${this.baseUrl}/${id}`)).data;
    }
}

export const userService = new UserService();
