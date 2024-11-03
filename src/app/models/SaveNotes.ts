import mongoose,{model,Document,Schema} from "mongoose";

export interface SaveNotesType extends Document  {
    name:string,
    html:string;
}

const saveNotesSchema:Schema<SaveNotesType> = new Schema({
    name:{type:String,required:true,trim:true},
    html:{type:String,required:true,trim:true}
})

const SaveNotes = mongoose.models.SaveNotes as mongoose.Model<SaveNotesType> || mongoose.model<SaveNotesType>("SaveNotes",saveNotesSchema);
export default SaveNotes;