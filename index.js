const express = require('express')
const connectToMongoDB = require('./DBConnection')
const router = require("./routes")
const { logging, intercept } = require("./middleware")
const app = express()
const cors = require('cors')
const dotenv = require("dotenv")
dotenv.config()

connectToMongoDB(process.env.MONGO_DB_CONNECTION_URL)
.then(() => console.log("MongoDB connected.."))
.catch((err) => console.log("Mongodb connection error", err))

// Middleware
// app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(logging(process.env.LOG_FILE_NAME))
app.use((req, res, next) => {
    intercept(req, res, next);
});

app.use("/api", router)

const port = process.env.PORT
app.listen(port, () => console.log(`Server Started at port ${port}`))