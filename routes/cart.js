const express = require('express')
const { addProductsToCart, getCart } = require('../controllers/cart')
const router = express.Router()

router.post('/', addProductsToCart)
router.get('/', getCart)

module.exports = router