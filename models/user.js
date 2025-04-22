const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    email:{
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    } ,
    image:{
        type: String,
    },

    videos:[
        {
                type:mongoose.Schema.Types.ObjectId,
                ref: "Video" 
            }
    ],
},{timestamps: true})

module.exports = mongoose.model("User", userSchema)