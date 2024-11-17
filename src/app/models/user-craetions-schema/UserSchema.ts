import mongoose,{Schema,model,Document} from "mongoose";

export interface UserTypes extends Document {
    name:string;
    email:string;
    number:number;
    password:string;
    forgotPasswordToken:string;
    forgotPasswordTokenExpiry:Date;
}

const userSchema:Schema<UserTypes> = new Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true,trim:true},
    number:{type:Number,required:true,trim:true},
    password:{type:String,required:true,trim:true},
    forgotPasswordToken:{type:String},
    forgotPasswordTokenExpiry:{type:Date}
},{timestamps:true})

const UserModel = mongoose.models.UserModel || model<UserTypes>("UserModel",userSchema);
export default UserModel;