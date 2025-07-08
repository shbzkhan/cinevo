const mongoose = require("mongoose")

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    videoUrl:{
        type: String,
        require: true,
    },
    thumbnailUrl: {
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User" 
    }
},{timestamps: true})

module.exports = mongoose.model("Video", videoSchema)