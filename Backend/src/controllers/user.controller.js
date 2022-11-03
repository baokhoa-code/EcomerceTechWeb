const UserService = require('../services/user.service');
const ApiError = require('../api-error');

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, 'Name can not be empty'));
    }

    try {
        const userService = new UserService();
        const user = await userService.create(req.body);
        res.send({ message: 'Create success', ...user });
    } catch (error) {
        res.send({ message: 'Email already exist'});
        console.log(error);
        return next(new ApiError(500, 'An error occurred while creating the user'));
    }
};

exports.findAll = async (req, res, next) => {
    let users = [];

    try {
        const userService = new UserService();
        const { name } = req.query;
        if (name) {
            users = await userService.findByName(name);
        } else {
            users = await userService.all();
        }
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while retrieving users'));
    }

    return res.send(users);
};

exports.login = async (req, res, next) => {
    try {
        const userService = new UserService();
        const user = await userService.login(req.body.email, req.body.pass);
        if (user == undefined) return res.send({ message: 'Your email or password is incorrect' });
        else return res.send({ message: 'Login success', ...user });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while login'));
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const userService = new UserService();
        const user = await userService.findById(req.params.id);
        if (!user) {
            return next(new ApiError(404, 'User not found'));
        }
        return res.send(user);
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error retrieving user with id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'));
    }

    try {
        const userService = new UserService();
        const updated = await userService.update(req.params.id, req.body);
        if (!updated) {
            return next(new ApiError(404, 'User not found'));
        }
        return res.send({ message: 'User was updated successfully' });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error updating user with id=${req.params.id}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const userService = new UserService();
        const deleted = await userService.delete(req.params.id);
        if (!deleted) {
            return next(new ApiError(404, 'User not found'));
        }
        return res.send({ message: 'User was deleted successfully' });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Could not delete user with id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const userService = new UserService();
        const deleted = await userService.deleteAll();
        return res.send({
            message: `${deleted} Users were deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while removing all users'));
    }
};
