import axios from 'axios';

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
