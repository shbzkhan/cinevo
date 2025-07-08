const mongoose = require("mongoose")
require("dotenv").config()

exports.connectDB = async ()=>{
    await mongoose.connect(process.env.MONGODB_URL , {
         useNewUrlParser: true,
         useUnifiedTopology: true
    }).then(()=>console.log("Database Connected"))
    .catch((error)=>{
        console.log("Database not Connected")
        console.log(error.message)
        process.exit(1)
    })
}