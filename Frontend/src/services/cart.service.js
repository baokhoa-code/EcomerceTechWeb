import axios from 'axios';

const url = import.meta.env.VITE_APP_API_URL;

class CartService {
    constructor() {
        this.baseUrl = `${url}/api/carts`;
        this.api = axios.create({
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
    }

    async getByUid(uid){
        return (await this.api.get(`${this.baseUrl}/byuser/${uid}`)).data;
    }

    async deleteByUid(uid) {
        return (await this.api.delete(`${this.baseUrl}/byuser/${uid}`)).data;
    }

    async getMany() {
        return (await this.api.get(this.baseUrl)).data;
    }

    async create(cart) {
        return (await this.api.post(this.baseUrl, cart)).data;
    }
    
    async deleteMany() {
        return (await this.api.delete(this.baseUrl)).data;
    }
    
    async get(id) {
        return (await this.api.get(`${this.baseUrl}/${id}`)).data;
    }
    
    async update(id, cart) {
        return (await this.api.put(`${this.baseUrl}/${id}`, cart)).data;
    }
    
    async delete(id) {
        return (await this.api.delete(`${this.baseUrl}/${id}`)).data;
    }
}

export const cartService = new CartService();
