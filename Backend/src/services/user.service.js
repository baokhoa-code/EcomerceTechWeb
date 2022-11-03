const knex = require('../database/knex');
class UserService {
    constructor() {
        this.users = knex('user');
    }

    #getUser(payload) {
        const user = { ...payload };
        const userProperties = ['name', 'email', 'pass', 'address', 'phone'];

        Object.keys(user).forEach(function (key) {
            if (userProperties.indexOf(key) == -1) {
                delete user[key];
            }
        });
        return user;
    }

    async login(email, pass) {
        return await this.users.where({ email: email, pass: pass }).select('*').first();
    }

    async create(payload) {
        const user = this.#getUser(payload);
        const [id] = await this.users.insert(user);
        return { id, ...user };
    }

    async all() {
        return await this.users.select('*');
    }

    async findByName(name) {
        return await this.users.where('name', 'like', `%${name}%`).select('*');
    }

    async findByEmail(email) {
        return await this.users.where('email', email).select('*').first();
    }

    async findById(id) {
        return await this.users.where('id', id).select('*').first();
    }

    async update(id, payload) {
        const update = this.#getUser(payload);
        return await this.users.where('id', id).update(update);
    }

    async delete(id) {
        return await this.users.where('id', id).del();
    }

    async deleteAll() {
        return await this.users.del();
    }
}

module.exports = UserService;
