import mongoose,{Schema,Document} from "mongoose";

export interface Message extends Document{
    content:string;
    createdAt:Date
}

const messageSchema:Schema<Message> = new Schema({
   content:{type:String,required:true},
   createdAt:{type:Date,default:Date.now}
})


export interface Users extends Document {
    userName:string;
    email:string;
    number:number;
    password:string;
    isVerified:boolean;
    isAcceptingMessage:boolean;
    message:Message[],
    verifyToken:string;
    verifyTokenExpiry:Date,
}

const userSchema:Schema<Users> = new Schema({
    userName:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    number:{
        type:Number,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    message:[messageSchema],
    verifyToken:{
        type:String,
    },
    verifyTokenExpiry:{
        type:Date
    }
})

const UserModel = mongoose.models.UserModel as mongoose.Model<Users> || mongoose.model<Users>("UserModel",userSchema);
export default UserModel;