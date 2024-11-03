import SaveNotes from "@/app/models/SaveNotes";
import dbConnect from "@/app/dbconnects/dbConnects";
import { NextResponse,NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const payLoad = await req.json();
    // check wether any filed is empty or not
    if (!payLoad.name || !payLoad.html){
        return NextResponse.json("Please filled all the required field",{status:401})
    }
    await dbConnect();
    try {
        const saveObj = new SaveNotes({
            name:payLoad.name,
            html:payLoad.html
        })
        await saveObj.save();
        return NextResponse.json("notes saved successfully",{status:200})
    } catch (error) {
        console.log("error",error);
        return NextResponse.json("internal server error",{status:500})
    }
}