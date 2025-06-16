const mongoose= require("mongoose")
const blacklistTokenSchema= new mongoose.Schema({
    token:{
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expire: 86400        // 24 hours in seconds
    }
})

module.exports= mongoose.model("blacklist", blacklistTokenSchema)