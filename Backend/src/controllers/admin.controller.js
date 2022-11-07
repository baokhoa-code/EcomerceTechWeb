const AdminService = require('../services/admin.service');
const ApiError = require('../api-error');

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, 'Name can not be empty'));
    }

    try {
        const adminService = new AdminService();
        const admin = await adminService.create(req.body);
        res.send({ message: 'Create success', ...admin });
    } catch (error) {
        res.send({ message: 'Email already exist'});
        console.log(error);
        return next(new ApiError(500, 'An error occurred while creating the admin'));
    }
};

exports.findAll = async (req, res, next) => {
    let admins = [];

    try {
        const adminService = new AdminService();
        const { name } = req.query;
        if (name) {
            admins = await adminService.findByName(name);
        } else {
            admins = await adminService.all();
        }
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while retrieving admins'));
    }

    return res.send(admins);
};

exports.login = async (req, res, next) => {
    try {
        const adminService1 = new AdminService();
        const adminService2 = new AdminService();
        const checkExist = await adminService1.findByEmail(req.body.email);
        if(checkExist){
            const admin = await adminService2.login(req.body.email, req.body.pass);
            if (admin == undefined) return res.send({ message: 'Your password is incorrect' });
            else return res.send({ message: 'Login success', ...admin });
        }
        if(checkExist == undefined || checkExist == null)
            return res.send({ message: 'Your Email is not exist' });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while login'));
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const adminService = new AdminService();
        const admin = await adminService.findById(req.params.id);
        if (!admin) {
            return res.send({ message: 'Retrieve fail'});
        }
        return res.send({message: 'Retrieve success', ...admin});
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error retrieving admin with id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try {
        const adminService = new AdminService();
        const updated = await adminService.update(req.params.id, req.body);
        if (!updated) {
            return res.send({ message: 'User was not found' });
        }
        return res.send({ message: 'Update success' });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error updating admin with id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const adminService = new AdminService();
        const deleted = await adminService.delete(req.params.id);
        if (!deleted) {
            return next(new ApiError(404, 'Admin not found'));
        }
        return res.send({ message: 'Admin was deleted successfully' });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Could not delete admin with id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const adminService = new AdminService();
        const deleted = await adminService.deleteAll();
        return res.send({
            message: `${deleted} Admins were deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while removing all admins'));
    }
};
