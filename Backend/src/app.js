const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const productController = require('./controllers/product.controller');
const userController = require('./controllers/user.controller');
const adminController = require('./controllers/admin.controller');
const cartController = require('./controllers/cart.controller');

const upload = multer({
    dest: './public/'
})

const ApiError = require('./api-error');

const app = express();

app.use(cors());
app.use('/public', express.static(path.join(__dirname + '/../public')));
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to ecomerce application' });
});

app.route('/api/products')
    .get(productController.findAll)
    .post(productController.uploadAvatar.single('image'), productController.create)
    .delete(productController.deleteAll);

app.route('/api/products/:id')
    .get(productController.findOne)
    .put(productController.uploadAvatar.single('image'), productController.update)
    .delete(productController.delete);

app.route('/api/users/login').post(userController.login);
app.route('/api/users').get(userController.findAll).post(userController.create).delete(userController.deleteAll);
app.route('/api/users/:id').get(userController.findOne).put(userController.update).delete(userController.delete);

app.route('/api/admins/login').post(adminController.login);
app.route('/api/admins').get(adminController.findAll).post(adminController.create).delete(adminController.deleteAll);
app.route('/api/admins/:id').get(adminController.findOne).put(adminController.update).delete(adminController.delete);

app.route('/api/carts').get(cartController.findAll).post(cartController.create).delete(cartController.deleteAll);
app.route('/api/carts/:id').get(cartController.findOne).put(cartController.update).delete(cartController.delete);
app.route('/api/carts/byuser/:uid').get(cartController.findAllByUid).delete(cartController.deleteAllByUid);

app.use((req, res, next) => {
    return next(new ApiError(404, 'Resource not found'));
});

app.use((err, req, res) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

module.exports = app;
