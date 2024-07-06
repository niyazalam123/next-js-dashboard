import mongoose,{Schema,Document} from "mongoose";

export interface TodosTypes extends Document {
    todoId:string;
    isComplete:boolean;
    isVisited:boolean;
}

export interface Products extends Document{
    productId:string;
}

export interface userTypes extends Document{
    name:string;
    email:string;
    number:number;
    todos:TodosTypes[];
    password:string;
    forgotPasswordToken:string;
    forgotPasswordTokenExpiry:Date;
    isAssign:boolean;
    isBlock:boolean;
    products:Products[];
}



const ProductsSchema = new Schema<Products>({
    productId:{
        type:String,
    }
})

const todosSchema = new Schema<TodosTypes>({
    todoId:{type:String},
    isComplete:{type:Boolean,default:false},
    isVisited:{type:Boolean,default:false}
},{timestamps:true})

const userSchema = new Schema<userTypes>({
    name:{
        type:String,
        required:[true,"name is required"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        trim:true,
        unique:true
    },
    number:{
        type:Number,
        required:[true,"number is required"]
    },
    password:{
        type:String,
        required:true
    },
    todos:[todosSchema],
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    isAssign:{
        type:Boolean,
        default:false
    },
    isBlock:{
        type:Boolean,
        default:false
    },
    products:[ProductsSchema]
},{timestamps:true})

const userModel = (mongoose.models.Users as mongoose.Model<userTypes>) || mongoose.model<userTypes>("Users",userSchema);
export default userModel

