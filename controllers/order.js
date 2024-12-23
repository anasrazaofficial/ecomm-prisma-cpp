const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
    try {
        await prisma.order.create({ data: req.body });
        return res.status(201).send("Order placed successfully!");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Failed to place order! Visit logs for more details")
    }
}

module.exports = { createOrder };