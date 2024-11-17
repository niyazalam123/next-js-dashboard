import { NextResponse,NextRequest } from "next/server";
import dbConnect from "@/app/dbconnects/dbConnects";
import bcrypt from "bcryptjs"
import UserModel from "@/app/models/user-craetions-schema/UserSchema";

// api check key
function apiKeyCheck(req:NextRequest){
    const apiKey = req.headers.get("x-api-key");
    return apiKey && apiKey === process.env.NEXT_PUBLIC_USER_CREATE_API_KEY;
}
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(req:NextRequest){
    // check api key
    if (!apiKeyCheck(req)){
        return NextResponse.json("UnAuthorized Access",{status:401})
    }
    await dbConnect();
    try {
        const payLoad = await req.json();
        const {name,email,number,password} = payLoad;
        if (!name || !email || !number || !password){
            return NextResponse.json("Please Fill All The Filed",{status:499})
        }

        // email check 
        if (!emailRegex.test(email)) {
            return NextResponse.json("Invalid email format", { status: 400 });
        }

        // check user already present with this email or not
        const userFound = await UserModel.findOne({email: email});
        if (userFound){
            return NextResponse.json("User Already Exist! Try Another email to create account",{status:400 })
        }
        // encrypt the password
        const hassedPassword = await bcrypt.hash(password,10);
        // create an object
        const userObj = new UserModel({
            name,
            email,
            number,
            password:hassedPassword
        });
        await userObj.save();
        return NextResponse.json("User Create SuccessFully!!!",{status:200})
    } catch (error:any) {
        console.log("error",error);
        return NextResponse.json({"message":"Internal Server Error", error: error.message},{status:500})
    }
} 