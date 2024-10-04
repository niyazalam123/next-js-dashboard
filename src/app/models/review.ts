import mongoose,{Schema} from "mongoose";

export interface reviewTypes {
    name:string;
    isVerified:boolean;
    rating:number;
    review:string;
    bgColor:string;
}

const reviewSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true,
    },
    bgColor:{
        type:String,
        required:true
    }
},{timestamps:true})

const Review  = mongoose.models.review || mongoose.model("review",reviewSchema);
export default Review;