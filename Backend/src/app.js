const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error.controller');
const productController = require('./controllers/product.controller');
const userController = require('./controllers/user.controller');
const adminController = require('./controllers/admin.controller');
const cartController = require('./controllers/cart.controller');
const {verifyToken } = require('./middlewares/verifyToken.middleware');

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
    .post([verifyToken], productController.uploadAvatar.single('image'), productController.create)
    .delete([verifyToken], productController.deleteAll);

app.route('/api/products/:id(\\d+)')
    .get(productController.findOne)
    .put([verifyToken],productController.uploadAvatar.single('image'), productController.update)
    .delete([verifyToken], productController.delete);

app.route('/api/users/login')
    .post(userController.login);
app.route('/api/users')
    .get([verifyToken], userController.findAll)
    .post(userController.create)
    .delete([verifyToken], userController.deleteAll);
app.route('/api/users/:id(\\d+)')
    .get([verifyToken], userController.findOne)
    .put([verifyToken], userController.update)
    .delete([verifyToken], userController.delete);

app.route('/api/admins/login')
    .post(adminController.login);
app.route('/api/admins')
    .get([verifyToken], adminController.findAll)
    .post( adminController.create)
    .delete([verifyToken], adminController.deleteAll);
app.route('/api/admins/:id(\\d+)')
    .get([verifyToken], adminController.findOne)
    .put([verifyToken], adminController.update)
    .delete([verifyToken], adminController.delete);

app.route('/api/carts')
    .get( cartController.findAll)
    .post([verifyToken], cartController.create)
    .delete([verifyToken], cartController.deleteAll);
app.route('/api/carts/:id(\\d+)')
    .get([verifyToken], cartController.findOne)
    .put([verifyToken], cartController.update)
    .delete([verifyToken], cartController.delete);
app.route('/api/carts/byuser/:uid(\\d+)')
    .get([verifyToken], cartController.findAllByUid)
    .delete([verifyToken], cartController.deleteAllByUid);

app.use(errorController.resourceNotFound);

app.use(errorController.handleError);

module.exports = app;
