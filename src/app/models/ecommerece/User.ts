import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    number:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    wishList:[
        {
            productId:String,
        }
    ],
    cart:[
        {
            productId:String
        }
    ],
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order"
    }
})

const User = mongoose.models.User || mongoose.model("User",userSchema)