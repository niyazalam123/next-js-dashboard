import mongoose,{Schema} from "mongoose"

export interface Todos {
    subject:string;
    task:string;
    timeDuration:string;
    isCompleted:boolean;
}

const todosSchema = new Schema({
    subject:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true
    },
    task:{
        type:String,
        required:true,
        trim:true
    },
    timeDuration:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false,
        index:true
    }
},{timestamps: true})

const Todo = mongoose.models.Todo || mongoose.model("Todo",todosSchema);
export default Todo;