const express = require('express')
const userRoutes = require("./routes/user")

const app = express()

app.use(express.json())

app.use("/api/", userRoutes);

app.listen(5000, () => console.log(`Server is Listening on 5000`));