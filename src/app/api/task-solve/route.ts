import Todo from "@/app/models/todos/Todos";
import dbConnect from "@/app/dbconnects/dbConnects";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const payLoad = await req.json();
    const { subject, task, timeDuration } = payLoad;

    // Connect to the database
    await dbConnect();

    try {
        // Validate input
        if (!subject || !task || !timeDuration) {
            return NextResponse.json({ message: "Please fill all the fields" }, { status: 400 });
        }

        // find out subject is unique or not
        const alreadyExists = await Todo.findOne({subject:subject});
        if  (alreadyExists){
            return NextResponse.json("Subject already exists! Enter Unique Name",{status:409})
        }

        // Create and save a new Todo item
        const newTodo = new Todo({
            subject,
            task,
            timeDuration
        });
        await newTodo.save(); // Use save() for a single document
        return NextResponse.json({ message: "Todo saved successfully" }, { status: 200 });
    } catch (error) {
        console.error("Internal server error", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}


export async function GET(req: NextResponse) {
    // Extract query parameters from the request
    const url = new URL(req.url); // Correct way to handle URL
    const searchParams: any = new URLSearchParams(url.search);

    const limit = parseInt(searchParams.get("limit")) || 25;
    const page = parseInt(searchParams.get("page")) || 1;
    const skip = (page - 1) * limit;
    const searchValue = searchParams.get("search");

    const query: any = {};
    if (searchValue) {
        query.subject = { $regex: new RegExp(searchValue, 'i') }; // Case-insensitive search
    }

    // Connect to the database
    await dbConnect();
    try {
        // Query the database with the extracted parameters
        const count2 = await Todo.countDocuments();
        const data = await Todo.find(query).limit(limit).skip(skip).sort({ createdAt: -1 });

        // Return the data as a JSON response
        return NextResponse.json({data,count2}, { status: 200 });
    } catch (error) {
        console.error("Something went wrong:", error); // Improved error logging
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

