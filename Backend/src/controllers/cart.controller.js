const CartService = require('../services/cart.service')
const ApiError = require('../api-error')

exports.create = async (req, res, next) => {
    try {
        const cartService = new CartService()
        const cart = await cartService.create(req.body)
        return res.send({ message: 'Create success', ...cart })
    } catch (error) {
        console.log(error)
        return next(
            new ApiError(500, 'An error occurred while creating the cart')
        )
    }
}

exports.findAll = async (req, res, next) => {
    let carts = []

    try {
        const cartService = new CartService()
        const { name } = req.query
        if (name) {
            carts = await cartService.findByName(name)
        } else {
            carts = await cartService.all()
        }
    } catch (error) {
        console.log(error)
        return next(
            new ApiError(500, 'An error occurred while retrieving carts')
        )
    }

    return res.send(carts)
}

exports.findAllByUid = async (req, res, next) => {
    let carts = []

    try {
        const cartService = new CartService()
        const uid = req.params.uid
        if (uid) {
            carts = await cartService.findAllByUid(uid)
        } else {
            carts = await cartService.all()
        }
    } catch (error) {
        console.log(error)
        return next(
            new ApiError(500, 'An error occurred while retrieving carts')
        )
    }

    return res.send(carts)
}

exports.findOne = async (req, res, next) => {
    try {
        const cartService = new CartService()
        const cart = await cartService.findById(req.params.id)
        if (!cart) {
            return next(new ApiError(404, 'Cart not found'))
        }
        return res.send(cart)
    } catch (error) {
        console.log(error)
        return next(
            new ApiError(
                500,
                `Error retrieving cart with id=${req.params.id}`
            )
        )
    }
}

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty'))
    }

    try {
        const cartService = new CartService()
        const updated = await cartService.update(req.params.id, req.body)
        if (!updated) {
            return next(new ApiError(404, 'Cart not found'))
        }
        return res.send({ message: 'Cart was updated successfully' })
    } catch (error) {
        console.log(error)
        return next(
            new ApiError(500, `Error updating cart with id=${req.params.id}`)
        )
    }
}

exports.delete = async (req, res, next) => {
    try {
        const cartService = new CartService()
        const deleted = await cartService.delete(req.params.id)
        if (!deleted) {
            return next(new ApiError(404, 'Cart not found'))
        }
        return res.send({ message: 'Cart was deleted successfully' })
    } catch (error) {
        console.log(error)
        return next(
            new ApiError(
                500,
                `Could not delete cart with id=${req.params.id}`
            )
        )
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        const cartService = new CartService()
        const deleted = await cartService.deleteAll()
        return res.send({
            message: `${deleted} Carts were deleted successfully`
        })
    } catch (error) {
        console.log(error)
        return next(
            new ApiError(500, 'An error occurred while removing all carts')
        )
    }
}

exports.deleteAllByUid = async (req, res, next) => {
    try {
        const cartService = new CartService()
        const uid = req.params.uid
        const deleted = await cartService.deleteAllByUid(uid)
        return res.send({
            message: 'Carts were deleted successfully'
        })
    } catch (error) {
        console.log(error)
        return next(
            new ApiError(500, 'An error occurred while removing all carts')
        )
    }
}
