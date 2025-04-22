const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const fileupload = require("express-fileupload")
const app = express()
require("dotenv").config()

app.use(cors())
app.use(cookieParser())

require("./config/database").connectDB()
require("./config/cloudinary").cloudinaryConnect()


const Port = process.env.PORT || 3000

app.use(express.json())
app.use(fileupload(
    {
        useTempFiles : true,
        tempFileDir : '/tmp/'
    }
))

// app.use()

const user = require("./router/user")
app.use("/api/v1", user)
// app.use("api/vi/uploads")


app.listen(Port,()=>{
    console.log("server run on port", Port)
})