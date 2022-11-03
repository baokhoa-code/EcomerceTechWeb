const knex = require('../database/knex')
class ProdcutService {
    constructor() {
        this.products = knex('products')
    }

    #getProduct(payload) {
        const product = { ...payload }
        const productProperties = [
            "name", "brand", "price", "image", "description"
        ]

        Object.keys(product).forEach(function (key) {
            if (productProperties.indexOf(key) == -1) {
                delete product[key]
            }
        })
        return product
    }
    
    async create(payload) {
        const product = this.#getProduct(payload)
        const [id] = await this.products.insert(product)
        return { id, ...product }
    }

    async all() {
        var data = await this.products.select('*');
        data = data.map((item) => { item.image = `http://localhost:3000/public/${item.image}`; return item})
        return data;
    }

    async findByName(name) {
        return await this.products
            .where('name', 'like', `%${name}%`)
            .select('*');
    }

    async findById(id) {
        var data = await this.products.where('id', id).select('*').first();
        data.image = `http://localhost:3000/public/${data.image}`;
        return data;
    }

    async update(id, payload) {
        const update = this.#getProduct(payload);
        return await this.products.where('id', id).update(update);
    }

    async delete(id) {
        return await this.products.where('id', id).del();
    }

    async deleteAll() {
        return await this.products.del();
    }
}

module.exports = ProdcutService
