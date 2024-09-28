import Todo from "@/app/models/todos/Todos";
import dbConnect from "@/app/dbconnects/dbConnects";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request:NextRequest,{params}:any){
    const id = params.id;
    await dbConnect();

    try {
        // find document by id for check
        const checkId = await Todo.findOne({_id:id});
        if (!checkId){
            return NextResponse.json("No data found with this id",{status:404});
        }
        // find by id and update that documents
        await Todo.updateOne({_id:id},{$set:{isCompleted:true}});
        return NextResponse.json("Todo updated successfully",{status:200})
    } catch (error) {
        console.log("error",error)
        return NextResponse.json("internal server error",{status:500})
    }
}


export async function DELETE(request:NextRequest,{params}:any){
    const id = params.id;
    await dbConnect();

    try {
        // find id to chekc is there any document is present;
        const docum = await Todo.findOne({_id:id});
        if (!docum){
            return NextResponse.json("No data found with this id",{status:404});
        }

        // delete that document using id
        await Todo.deleteOne({_id:id});
        return NextResponse.json("Todo deleted successfully",{status:200})

    } catch (error) {
        console.log("error",error);
        return NextResponse.json("Internal Server Error",{status:500});
    }

}