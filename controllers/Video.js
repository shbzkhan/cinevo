const  mongoose  = require("mongoose");
const cloudinary = require("cloudinary").v2;
const User = require("../models/user");
const Video = require("../models/video")

const uploadToCloudinary = async(file, folder)=>{
    const options ={folder}
    options.resource_type = "auto"

    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

 const deleteToCloudnary = async (fileUrl, type) => {
   
      const parts = fileUrl.split('/');
      const fileName = parts[parts.length - 1].split('.')[0];
      const publicId = `aoraapp/${fileName}`;
  
      return await cloudinary.uploader.destroy(publicId,{resource_type:`${type}`});
  
  };

exports.VideoFile = async(req, res)=>{
    try {
        const {title, description, userId}= req.body;
        const thumbnail = req.files.thumbnail
        const video = req.files.video

        const user = await User.findById({_id: userId})
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not exit"
            })
        }

        const thumbnailUpload = await uploadToCloudinary(thumbnail, "aoraapp")
        const videoUpload = await uploadToCloudinary(video, "aoraapp")
        console.log("video uploaded to cloudinary", videoUpload)

        const videoData = await Video.create({
            title,
            thumbnailUrl: thumbnailUpload.secure_url,
            videoUrl: videoUpload.secure_url,
            description,
            user: userId
        })
        await User.findByIdAndUpdate(
            {_id:userId},
            {
                $push:{
                    videos: videoData._id
                }
            },
            {new: true})
        return res.status(200).json({
            success: true,
            data: videoData,
            message: "Video Uploaded successfully"
        })
    } catch (error) {
        console.error("file upload error ", error.message)
        res.status(500).json({
            success: false,
            message: "Please Upload again !!!"
        })
    }
}

exports.getAllPost =async(req, res)=>{
    try {
        const video = await Video.find().populate("user").exec()
        res.status(200).json({
            success: true,
            data: video,
            message: "Video fetch successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Video not fetch please try again!!"
        })
    }
}

exports.getPostById =async(req, res)=>{
    try {
        const id = req.params.id;
        const video = await Video.findById(id).populate("user").exec()
        res.status(200).json({
            success: true,
            video,
            message: "Video fetch successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Video not fetch please try again!!"
        })
    }
}

exports.deletePost = async(req, res)=>{
    try {
        const id = req.params.id
        const {userId} = req.body
        console.log("userID", userId)

        
        const video = await Video.findById(id)
        if(!video){
            return res.status(404).json({
                success: false,
                message: "video not found"
            })
        }
        
        const uid = new mongoose.Types.ObjectId(userId)
        console.log("uid", uid)

        if(!uid.equals(video.user)){
            return res.status(400).json({
                success: false,
                message: "Unauthorized user"
            })
        }
       
    console.log(video)
         const videoResult = await deleteToCloudnary(video.videoUrl, "video") 
         const imageResult = await deleteToCloudnary(video.thumbnailUrl, "image")
        // await cloudinary.uploader.destroy("aoraapp/wto1qortebq82pu3vcsw")
        

        console.log('Video deleted:', videoResult);
        console.log('Thumbnail deleted:', imageResult);
        if(videoResult.result !== 'ok' || imageResult.result !== 'ok'){
            return res.status(404).json({
                success: false,
                message: "video and thumbnail are not deleted"
            })
        }
        await Video.findByIdAndDelete(id)

        await User.findByIdAndUpdate(
            {_id:userId},
            {
                $pull:{
                    videos: video._id
                }
            },
            {new: true})
    
        res.status(200).json({
            success: true,
            message: "Post Deleted Successfully"
        })
    } catch (error) {
        console.error("error ", error.message)
        res.status(500).json({
            success: false,
            message: "Post not deleted please try again!!"
        })
    }
}