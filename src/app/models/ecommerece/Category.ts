import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category:{
        type:String,
        required:true
    }
})
const category = mongoose.models.category || mongoose.model("category",categorySchema);
export default category;