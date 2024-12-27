const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addProductsToCart = async (req, res) => {
    try {
        const cart = await prisma.cart.create({ data: {} });

        const payload = await Promise.all(
            req.body.products.map(async (product) => {
                const productData = await prisma.product.findUnique({
                    where: { id: product.productId },
                    select: { price: true }
                });

                if (!productData) {
                    throw new Error(`Product with ID ${product.productId} not found`);
                }

                return {
                    productId: product.productId,
                    quantity: product.quantity,
                    price: product.quantity * productData.price,
                    cartId: cart.id,
                };
            })
        );

        await prisma.cartItem.createMany({
            data: payload,
            skipDuplicates: true
        });
        return res.status(200).send("Products added to cart successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Failed to add products to cart. Visit logs for more details");
    }
}

const getCart = async (req, res) => {
    try {
        const cart = await prisma.cart.findFirst({
            orderBy: { id: 'desc' }
        });

        const cartItems = await prisma.cartItem.findMany({
            where: { cartId: cart.id },
            include: {
                product: true
            }
        });

        const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

        return res.status(200).json({ cartItems, totalAmount });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Failed to fetch cart. Visit logs for more details");
    }
}

module.exports = { addProductsToCart, getCart };

// m=model//user,product,cart,order
// v=view
// c=controller//signup, login, addProductsToCart, getCart, placeOrder