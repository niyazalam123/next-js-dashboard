import { NextResponse, NextRequest } from "next/server";
import userModel from "@/app/models/signup";
import dbConnect from "@/app/dbconnects/dbConnects";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req:NextRequest){
    try {
        dbConnect();
        const {email,password} = await req.json();
        // check email 
        const user = await userModel.findOne({email})
        if(!user){
            return NextResponse.json({message:"user not found"},{status:404})
        }
        // compare password
        const validatePassword = await bcrypt.compare(password,user.password);
        if (!validatePassword){
            return NextResponse.json({message:"Password does not match"},{status:401})
        }
        // check user is block or not
        const isBlock = user.isBlock;
        if(isBlock){
            return NextResponse.json({message:"Access blocked! contact admin"},{status:505})
        }
        // create token data
        const tokenData = {
            name:user.name,
            email:user.email,
            number:user.number,
            id:user._id
        }
        // create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECREAT!,{expiresIn:"1d"});

        // craete response 
        const response = NextResponse.json({message:"Login successFully"},{status:200});

        // set token to cookies
        response.cookies.set("token",token,{httpOnly:true})
        return response;
    } catch (error) {
        return NextResponse.json({message:"Internal server error"},{status:500})
    }
}