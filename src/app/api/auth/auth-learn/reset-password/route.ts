import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/dbconnects/dbConnects";
import UserModel from "@/app/models/user-craetions-schema/UserSchema";
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
    const payLoad = await req.json();
    const { password } = payLoad;
    try {
        if (!password) {
            return NextResponse.json("Please Provide Password!!!", { status: 400 });
        }
        // extract token query
        const { searchParams } = new URL(req.url);
        const token = searchParams.get("token");
        if (!token) {
            return NextResponse.json("Please provide valid token", { status: 400 });
        }
        // find user based on token
        const user = await UserModel.findOne({ forgotPasswordToken: token });
        if (!user) {
            return NextResponse.json("No user found with this token", { status: 400 })
        }

        // check token expire or not
        if (Date.now() > user.forgotPasswordTokenExpiry) {
            return NextResponse.json("Token has expired", { status: 400 });
        }

        // hassed new password
        const hassedPassword = await bcrypt.hash(password,10);
        user.password = hassedPassword;
        user.forgotPasswordToken = null;
        user.forgotPasswordTokenExpiry = null;
        await user.save();
        return NextResponse.json("Password changed successfully!!!",{status:200})
    } catch (error: any) {
        console.log("error", error);
        return NextResponse.json({ message: "internal server error", error: error.message }, { status: 500 });
    }
}