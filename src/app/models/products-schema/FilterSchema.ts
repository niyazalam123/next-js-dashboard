import mongoose,{Schema,Document,model} from "mongoose";

export interface FilterType extends Document {
    title:string;
    price:number;
    color:string;
    size:string;
    image:string;
};

const filterSchema:Schema<FilterType> = new Schema({
    title:{type:String,required:true,trim:true},
    price:{type:Number,required:true,trim:true},
    color:{type:String,required:true,trim:true},
    size:{type:String,required:true,trim:true},
    image:{type:String,required:true,trim:true}
})

const FilterProduct = mongoose.models.FilterProduct  || model<FilterType>("FilterProduct",filterSchema);
export default FilterProduct;