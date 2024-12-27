require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary')

const userRoutes = require("./routes/user")
const productRoutes = require("./routes/product")
const cartRoutes = require("./routes/cart")
const orderRoutes = require("./routes/order")

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env
const app = express()

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET
})

app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/"
}))

app.use("/api/", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api", orderRoutes);

// localhost:8080

// ---/api/signup
// ---/api/login

app.listen(5000, () => console.log(`Server is Listening on 5000`));

// c = Post (create) body
// r = Get (read) no body
// u = Put (update) body, id
// d= Delete (delete) id

// http://localhost:5000/api/signup