const User = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

exports.signUp = async(req, res)=>{
    try {
        const {username, email, password} = req.body
     if(!username || !email || !password){
        console.log("Please fill all details")
     }

        const alreadySignIn = await User.findOne({email})
        const alreadySignInByUsername = await User.findOne({username})
        if(alreadySignIn){
            return res.status(500).json(
                {
                    success: false,
                    message: "Email already exist",
                }
            )
        }

        if(alreadySignInByUsername){
        
            return res.status(500).json(
                {
                    success: false,
                    message: "Username already exist",
                }
            )
        }

        let hashPassword;
        hashPassword = await bcrypt.hash(password, 10 )
        const saveUser = await User.create({
            username, 
            email, 
            password:hashPassword,
            image:`https://ui-avatars.com/api/?background=0D8ABC&color=fff&bold=true&name=${username}`
        })
        
        console.log("User sign up data ", saveUser)
        res.status(200).json({
            success: true,
            data: saveUser,
            message: "user sign up successfuly",
        })
    }
     catch (error) {
        res.status(500).json({
            success: false,
            message: "User sign up failed",
            error: error.message
        })
    }
}

exports.signIn = async(req, res)=>{
    const { emailOrUsername, password} = req.body
    
    try {
        let user = await User.findOne({
            $or:[{email:emailOrUsername}, {username:emailOrUsername }]
        }).populate("videos").exec()
        
        if(!user){
            return res.status(404).json({
                success:false,
                message: "user not exist"
            })
        }
        let comparedPassword = await bcrypt.compare(password, user.password)
        if(comparedPassword){
            const payload ={
                email:user.email,
                _id:user._id,
                username:user.username,
                image: user.image,
                videos: user.videos
            }
            const token = await jwt.sign(
                payload,
                process.env.JWT_TOKEN,
                {
                    expiresIn: "4d"
                })
                user = user.toObject()
                user.token = token,
                user.password = undefined

                const option ={
                    expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 *1000),
                    httpOnly: true
                }
            res.cookie("token", token, option).status(200).json({
                success: true,
                user,
                token,
                message: "User successfully logged in"
            })
            console.log("userLogin in successfully",  user)
        }else{
            res.status(404).json({
                success: false,
                message: "Password incorrect"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "sorry try again later",
            error: error.message
        })
    }
}

exports.tokenVerify= async(req, res) => {
    const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized, no token provided" });
  }

  const token = authHeader.split(" ")[1]; 

  try {
    const decode = jwt.verify(token, process.env.JWT_TOKEN);
        console.log(decode)
        req.user = decode
    res.json({ 
        message: "Protected data",
        user: decode 
    });
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    res.status(403).json({ 
        error: "Invalid token" 
    });
  }}

exports.getUser = async(req, res)=>{
     try {
            const id = req.params.id;
            const user = await User.findById(id).populate("videos").exec()
            res.status(200).json({
                success: true,
                user,
                message: "User fetch successfully"
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "User not fetch please try again!!"
            })
        }
}

