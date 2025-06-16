const express= require("express")
const router=express.Router()
const {body}= require("express-validator")
const userController= require("../controllers/user.controller")
const authMiddleware= require("../middlewares/auth.middleware")
const blackListTokenModel=require("../models/blacklistToken.model")

router.post("/register", [
    body("email").isEmail().withMessage("invalid email"),
    body("fullname.firstname").isLength({min:3}).withMessage("First Name must be at least 3 character long"),
    body("password").isLength({min: 6}).withMessage("password must be at least 6 character long")
    ],
    userController.registerUser
)

router.post("/login", [
    body("email").isEmail().withMessage("invalid email"),
    body("password").isLength({min: 6}).withMessage("Password") 
    ],
    userController.loginUser
)

router.get('/profile', authMiddleware.authUser, userController.getUserProfile)

router.get("/logout", authMiddleware.authUser, userController.logoutUser)

module.exports= router