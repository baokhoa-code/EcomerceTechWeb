import axios from 'axios';
import store from '../store';
import main from '@/main';

const url = import.meta.env.VITE_APP_API_URL;

class AdminService {
    constructor() {
        this.baseUrl = `${url}/api/admins`;
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

    async create(admin) {
        return (await this.api.post(this.baseUrl, admin)).data;
    }
    
    async deleteMany() {
        return (await this.api.delete(this.baseUrl)).data;
    }
    
    async get(id) {
        return (await this.api.get(`${this.baseUrl}/${id}`)).data;
    }
    
    async update(id, admin) {
        return (await this.api.put(`${this.baseUrl}/${id}`, admin)).data;
    }
    
    async delete(id) {
        return (await this.api.delete(`${this.baseUrl}/${id}`)).data;
    }
}

export const adminService = new AdminService();
