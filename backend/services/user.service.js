const userModel= require("../models/user.model")

module.exports.createUser= async ({firstname, lastname, email, password})=>{
    if (!firstname || !email || !password){
        throw new Error("all fields are required")
    }

    const existingUser= await userModel.findOne({email});
    if (existingUser) {
        throw new Error("User with this email already exists.");
    }

    const user= await userModel.create({
        fullname:{
            firstname, lastname
        },
        email,
        password
    })
    return user
}