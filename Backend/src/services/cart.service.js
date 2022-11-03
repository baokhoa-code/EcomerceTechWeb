const knex = require('../database/knex')
class ProdcutService {
    constructor() {
        this.carts = knex('carts')
    }

    #getCart(payload) {
        const cart = { ...payload }
        const cartProperties = [
            "uid", "user_name", "user_address", "user_phone", "created_date","cart","total","valid"
        ]

        Object.keys(cart).forEach(function (key) {
            if (cartProperties.indexOf(key) == -1) {
                delete cart[key]
            }
        })
        return cart
    }
    
    async create(payload) {
        const cart = this.#getCart(payload)
        const [id] = await this.carts.insert(cart)
        return { id, ...cart }
    }

    async all() {
        return await this.carts.select('*');
    }

    async findByName(name) {
        return await this.carts
            .where('name', 'like', `%${name}%`)
            .select('*');
    }

    async findById(id) {
        return await this.carts.where('id', id).select('*').first();
    }

    async findAllByUid(uid) {
        return await this.carts.where('uid', uid).select('*');
    }

    async update(id, payload) {
        const update = this.#getCart(payload);
        return await this.carts.where('id', id).update(update);
    }

    async delete(id) {
        return await this.carts.where('id', id).del();
    }

    async deleteAll() {
        return await this.carts.del();
    }

    async deleteAllByUid(uid) {
        return await this.carts.where('uid', uid).del();
    }
}

module.exports = ProdcutService
