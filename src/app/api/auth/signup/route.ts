import { NextResponse, NextRequest } from "next/server";
import userModel from "@/app/models/signup";
import dbConnect from "@/app/dbconnects/dbConnects";
import bcrypt from 'bcryptjs';

// Check API key
function checkApiKey(req: NextRequest) {
    const apiKey = req.headers.get('x-api-key');
    if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_USER_REGISTER_API_KEY) {
        return false;
    }
    return true;
}

// Define POST route for user creation
export async function POST(request: NextRequest) {
    if (!checkApiKey(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const payLoad = await request.json();
    const { email, password, name, number } = payLoad;

    try {
        // Check if the user already exists by email
        const existingUser = await userModel.findOne({email: email});
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 403 });
        }

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create new user data
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            number
        });
        // Save the user data in the database
        await newUser.save();

        return NextResponse.json({ message: "User created successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
