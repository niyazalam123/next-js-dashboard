import { NextResponse, NextRequest } from "next/server";
import userModel from "@/app/models/signup";
import dbConnect from "@/app/dbconnects/dbConnects";

export async function GET() {
    try {
        await dbConnect();
        const response = await userModel.find();
        return NextResponse.json(response, { status: 200 })
    } catch (error) {
        return NextResponse.json("internal server error", { status: 500 })
    }
}


export async function PUT(req: NextRequest) {
    await dbConnect();
    try {
        const usersUpdated = await req.json();
        // Wait for all updates to complete
        await Promise.all(usersUpdated.map((user: any) =>
            userModel.findByIdAndUpdate(user._id, { isAssign: user.isAssign })
        ));
        return NextResponse.json("updated successfully", { status: 200 })
    } catch (error) {
        return NextResponse.json("internal server error", { status: 500 })
    }
}

