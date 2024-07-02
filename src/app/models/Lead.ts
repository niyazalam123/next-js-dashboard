import mongoose from "mongoose";
import Mongoose, { Document, Schema } from "mongoose";

// define schema type
export interface LeadsType extends Document {
    partName: string;
    makeModel: string;
    year: number;
    options: string;
    name: string;
    email: string;
    number: number;
    zipCode: number;
}

// define schema for leads api
const leadsSchema = new Schema<LeadsType>({
    partName: {
        type: String,
        required: [true, "PartName is required"],
        index: true
    },
    makeModel: {
        type: String,
        required: [true, "'Make and Model filled is required"]
    },
    year: {
        type: Number,
        required: [true, "Year is required"]
    },
    options: {
        type: String,
        required: [true, "options filled is required"],
        trim: true
    },
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please add a valid email address'
        ]
    },
    number:{
        type:Number,
        required:[true,'number is required'],
        trim:true,
    },
    zipCode:{
        type:Number,
        required:[true,"zipcode is required"],
        trim:true
    }
}, { timestamps: true });


const LeadModel = (mongoose.models.Leads as mongoose.Model<LeadsType>)  || mongoose.model<LeadsType>("Leads",leadsSchema);

export default LeadModel;