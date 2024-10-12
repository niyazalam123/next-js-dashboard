import mongoose,{Schema} from "mongoose";

export interface ProductsReview {
    name:string;
    rating:number;
    review:string;
    like:number;
    disLike:number;
}


export interface reply {
    name:string;
    like:number;
    disLike:number;
    review:string;
    // bgColor:string;
}


export const replySchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    like:{
        type:Number,
        default:0
    },
    disLike:{
        type:Number,
        default:0
    }
},{timestamps:true})


const productsSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true
    },
    like:{type:Number,default:0},
    disLike:{type:Number,default:0},
    replies:[replySchema]
},{timestamps:true})


const ProductReview2 = mongoose.models.ProductReview || mongoose.model("ProductReview",productsSchema);
export default ProductReview2;
