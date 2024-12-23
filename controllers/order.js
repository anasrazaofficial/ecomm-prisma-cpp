const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
    try {
        const order = await prisma.order.create({ data: req.body });
        return res.status(201).json({
            order,
            message: "Order placed successfully!"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Failed to place order! Visit logs for more details")
    }
}

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const id = Number(req.params.id);

        const order = await prisma.order.findUnique({ where: { id } })
        if (!order) {
            return res.status(404).send("Order not found!");
        }

        await prisma.order.update({ data: { status }, where: { id } });
        return res.status(200).send(`Order status successfully updated to ${status}`);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Failed to ${status.slice(0, 1).toUpperCase()} ${status.slice(1)} order! Visit logs for more details`);
    }
}

module.exports = { createOrder, updateOrderStatus };