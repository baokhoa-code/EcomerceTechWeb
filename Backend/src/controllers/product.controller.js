const ProductService = require('../services/product.service')
const ApiError = require('../api-error')

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        const mimeExtension = {
            'image/jpeg': '.jpeg',
            'image/jpg': '.jpg',
            'image/png': '.png',
            'image/gif': '.gif',
        }
        cb(null, file.fieldname + '-' + Date.now() + mimeExtension[file.mimetype]);
    }
})

exports.uploadAvatar = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/gif') {
            cb(null, true);
        } else {
            cb(null, false);
            req.fileError = 'File format is not valid';
        }
    }
 })

exports.create = async (req, res, next) => {
    if (!req.body?.name || !req.body?.brand || !req.body?.description || !req.body?.price || !req?.file || !req.file?.filename ) {
        return  res.send({ message: 'All field must be filled'})
    }
    
    try {
        const prodcutService = new ProductService()
        const data ={
            name: req.body.name,
            brand: req.body.brand,
            description: req.body.description,
            price: req.body.price,
            image:req.file.filename
        }
        const product = await prodcutService.create(data)
        return  res.send({ message: 'Create success', ...product })
    } catch(error) {
        console.log(error)
        return  res.send({ message: 'Create fail'})
    }
}

exports.update = async (req, res, next) => {
    try {
        var {image, ... data} = req.body;
        const prodcutService = new ProductService();
        if(req.file?.filename){
            data = {image: req.file.filename, ... data}
        }
        const updated = await prodcutService.update(req.params.id, data)
        if (!updated) {
            return  res.send({ message: 'Update fail'})
        }
        return  res.send({ message: 'Update success'})
    } catch (error) {
        console.log(error)
        return  res.send({ message: 'Update fail'})
    }
}

exports.findAll = async (req, res, next) => {
    let products = []

    try {
        const prodcutService = new ProductService()
        const { name } = req.query
        if (name) {
            products = await prodcutService.findByName(name)
        } else {
            products = await prodcutService.all()
        }
    } catch (error) {
        console.log(error)
        return next(
            new ApiError( 500, 'An error occurred while retrieving products')
        )
    }

    return res.send(products)
}

exports.findOne = async (req, res, next) => {
    try {
        const prodcutService = new ProductService()
        const product = await prodcutService.findById(req.params.id)
        if (!product) {
            return next(new ApiError(404, 'Product not found'))
        }
        return res.send(product)
    } catch (error) {
        console.log(error)
        return next(
            new ApiError(
                500,
                `Error retrieving product with id=${req.params.id}`
            )
        )
    }
}

exports.delete = async (req, res, next) => {
    try {
        const prodcutService = new ProductService()
        const deleted = await prodcutService.delete(req.params.id)
        if(!deleted){
            return next(new ApiError(404, 'Product not found'))
        }
        return res.send({ message: 'Product was deleted successfully'})
    } catch (error) {
        console.log(error)
        return next(
            new ApiError(
                500,
                `Could not delete product with id=${req.params.id}`
            )
        )
    }
}

exports.deleteAll = async (req, res, next) => {
   try {
        const prodcutService = new ProductService()
        const deleted = await prodcutService.deleteAll()
        return res.send({
            message: `${deleted} Products were deleted successfully`
        })
   } catch (error) {
        console.log(error)
        return next(
            new ApiError(500, 'An error occurred while removing all products')
        )
   }
}
