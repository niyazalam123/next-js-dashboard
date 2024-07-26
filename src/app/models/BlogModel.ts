import mongoose,{Schema} from "mongoose";

const blogSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    metaDescription:{
        type:String,
        required:true
    },
    metaKeyWords:[String],
    img:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    },
    html:{
        type:String,
        required:true
    }
},{timestamps:true});

const Blog = mongoose.models.Blog || mongoose.model("Blog",blogSchema);
export default Blog;