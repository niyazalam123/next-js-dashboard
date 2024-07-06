import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/dbconnects/dbConnects";
import userModel from "@/app/models/signup";
import productModel from "@/app/models/Products";

export async function GET(){
    try {
        await dbConnect();
        // find all user whose products array length graeter than 1
        const users = await userModel.find({
            $expr: { $gt: [{ $size: "$products" }, 1] }
        });
        // find products of all user based on thier id
        return NextResponse.json(users,{status:200})
    } catch (error) {
        return NextResponse.json("error",{status:500})
    }
}

