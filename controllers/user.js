const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const signup = async (req, res) => {
    try {
        await prisma.user.create({ data: req.body });
        return res.status(200).json("User created successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).json("Failed to create user. Visit logs for more details");
    }
}


const login = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email: req.body.email }
        });

        if (!user) {
            return res.status(404).json("User not found at given email: " + req.body.email);
        }

        if (user.password !== req.body.password) {
            return res.status(401).json("Please provide correct password to login");
        }

        return res.status(200).json("User logged in successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).json("Failed to login. Visit logs for more details");
    }
}

module.exports = { signup, login };