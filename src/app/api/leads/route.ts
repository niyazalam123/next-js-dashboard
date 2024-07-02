import dbConnect from "@/app/dbconnects/dbConnects";
import LeadModel from "@/app/models/Lead";
import { NextResponse, NextRequest } from "next/server";

// secure api route
function checkApiKey(req: Request) {
    const apiKey = req.headers.get('x-api-key');
    if (!apiKey || apiKey !== process.env.lEADS_API_KEY) {
        return false;
    }
    return true;
}

export async function Post(request: NextRequest) {
    // check varifications of api key
    // if(!checkApiKey(request)){
    //     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    // }

    try {
        dbConnect();
        const payLoad = await request.json();
        const leads = new LeadModel({
            ...payLoad
        });
        await leads.save();
        return NextResponse.json({message:"data upload successfully",success: true},{status:200})
    } catch (error:any) {
        return NextResponse.json({ message: "Error uploading data", success: false, error: error.message }, { status: 500 });
    }
}