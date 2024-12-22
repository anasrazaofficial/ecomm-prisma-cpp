const { PrismaClient } = require('@prisma/client');
const cloudinary = require('cloudinary');

const prisma = new PrismaClient();

const addProduct = async (req, res) => {
    try {
        let image = await cloudinary.v2.uploader.upload(req.files.image.tempFilePath,
            { folder: "ecommerce-store-duet/products" }
        );

        const payload = { ...req.body, image: image.public_id, price: Number(req.body.price) };
        await prisma.product.create({ data: payload });

        return res.status(200).json("Product added successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).json("Failed to add product. Visit logs for more details");
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        return res.json(products);
    } catch (error) {
        console.error(error);
        return res.json("Failed to fetch products. Visit logs for more details");
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!product) {
            return res.json("Product not found");
        }
        return res.json(product);
    } catch (error) {
        console.error(error);
        return res.json("Failed to fetch product. Visit logs for more details");
    }
}

const updateProduct = async (req, res) => {
    try {
        await prisma.product.update({
            where: { id: parseInt(req.params.id) },
            data: req.body
        });
        return res.json("Product updated successfully");
    } catch (error) {
        console.error(error);
        return res.json("Failed to update product. Visit logs for more details");
    }
}

const deleteProduct = async (req, res) => {
    try {
        await prisma.product.delete({
            where: { id: parseInt(req.params.id) }
        });
        return res.json("Product deleted successfully");
    } catch (error) {
        console.error(error);
        return res.json("Failed to delete product. Visit logs for more details");
    }
}

module.exports = { addProduct, getProducts, getProductById, updateProduct, deleteProduct };