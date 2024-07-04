import mongoose,{Schema,Document} from "mongoose";

export interface TodosTypes extends Document {
    title:string;
    message:string;
    writeBy:string;
}

const todosSchema = new Schema<TodosTypes>({
    title:{
        type:String,
        trim:true,
        required:true
    },
    message:{
        type:String,
        trim:true,
        required:true
    },
    writeBy:{
        type:String,
        required:true
    }

},{timestamps:true})

const TodoModel = (mongoose.models.Todos as mongoose.Model<TodosTypes>) || mongoose.model<TodosTypes>("Todos",todosSchema);
export default TodoModel