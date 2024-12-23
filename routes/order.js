const express = require('express')
const { createOrder, updateOrderStatus } = require('../controllers/order')
const router = express.Router()

router.post("/checkout", createOrder)
router.put("/update-order-status/:id", updateOrderStatus)

module.exports = router