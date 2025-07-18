const userModel= require("../models/user.model")
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")
const blackListTokenModel=require("../models/blacklistToken.model")
const captainModel = require("../models/captain.model")

module.exports.authUser= async(req, res, next)=>{
    const token= req.cookies.token || req.headers.authorization?.split(" ")[1]
    if (!token){
        return res.status(401).json({message: "Unathorized- No token provided"})
    }

    const isBlackListed=await blackListTokenModel.findOne({token:token})
    if (isBlackListed){
        return res.status(401).json({message:"Unauthorised- Token blacklisted"})
    }

    try {
        const decoded= jwt.verify(token, process.env.JWT_SECRET)
        const user= await userModel.findById(decoded._id)
        req.user=user
        return next()
        
    } catch (err) {
        console.log("err", err)
        return res.status(401).json({message: "Unathorized"})
    }
}

module.exports.authCaptain=async(req, res, next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(" ")[1]
    if (!token){
        return res.status(401).json({message:"Unauthorized- No token provided"})
    }

    const isBlackListed=await blackListTokenModel.findOne({token:token})
    if (isBlackListed){
        return res.status(401).json({message:"Unauthorized- Token blacklisted"})
    }

    try {
        const decoded=jwt.verify(token, process.env.JWT_SECRET)
        const captain=await captainModel.findById(decoded._id)
        req.captain=captain
        return next()
    } catch (error) {
        console.log("JWT Verify Error:", error.message);
        res.status(401).json({message:"Unauthorized- invalid token"})
    }
}