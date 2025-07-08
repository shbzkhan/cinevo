const express = require("express")
const { signUp, signIn, tokenVerify, getUser } = require("../controllers/User")
const { VideoFile, getAllPost, getPostById, deletePost, getUserPost} = require("../controllers/Video")
const router = express.Router()

router.post("/signup", signUp)
router.post("/signin", signIn)
router.get("/user/:id", getUser)
router.get("/tokenverify",tokenVerify);
router.post("/upload", VideoFile)
router.get("/videos", getAllPost)
router.get("/videos/:id", getPostById)
router.get("/videos/user/:id", getUserPost)

router.delete("/videos/delete/:id", deletePost)






module.exports = router