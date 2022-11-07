const knex = require('../database/knex');
class AdminService {
    constructor() {
        this.admins = knex('admin');
    }

    #getAdmin(payload) {
        const admin = { ...payload };
        const adminProperties = ['name', 'email', 'pass', 'address', 'phone'];

        Object.keys(admin).forEach(function (key) {
            if (adminProperties.indexOf(key) == -1) {
                delete admin[key];
            }
        });
        return admin;
    }

    async login(email, pass) {
        return await this.admins.where({ email: email, pass: pass }).select('*').first();
    }

    async create(payload) {
        const admin = this.#getAdmin(payload);
        const [id] = await this.admins.insert(admin);
        return { id, ...admin };
    }

    async all() {
        return await this.admins.select('*');
    }

    async findByName(name) {
        return await this.admins.where('name', 'like', `%${name}%`).select('*');
    }

    async findByEmail(email) {
        return await this.admins.where('email', email).select('*').first();
    }

    async findById(id) {
        return await this.admins.where('id', id).select('*').first();
    }

    async update(id, payload) {
        const update = this.#getAdmin(payload);
        return await this.admins.where('id', id).update(update);
    }

    async delete(id) {
        return await this.admins.where('id', id).del();
    }

    async deleteAll() {
        return await this.admins.del();
    }
}

module.exports = AdminService;
