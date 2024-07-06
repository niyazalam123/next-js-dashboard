import mongoose,{Document,Schema} from "mongoose";

export interface Products extends Document{
    title:string;
    price:number;
    category:string;
}

const productSchema = new Schema<Products>({
    title:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true});

const productModel = mongoose.models.Products || mongoose.model("Products",productSchema);
export default productModel;