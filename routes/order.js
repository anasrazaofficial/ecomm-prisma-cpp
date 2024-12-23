const express = require('express')
const { createOrder } = require('../controllers/order')
const router = express.Router()

router.post("/checkout", createOrder)

module.exports = router