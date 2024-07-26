import mongoose from "mongoose";

const produstSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    inStock:{
        type:Boolean,
        required:true,
        default:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"'category"
    }
});

const Product = mongoose.models.Product || mongoose.model("Product",produstSchema);
export default Product