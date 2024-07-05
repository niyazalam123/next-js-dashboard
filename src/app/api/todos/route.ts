import { NextResponse, NextRequest } from "next/server";
import TodoModel, { TodosTypes } from "@/app/models/Todos";
import dbConnect from "@/app/dbconnects/dbConnects";
import userModel, {  userTypes } from "@/app/models/signup";

// Function to check API key
function checkApiKey(req: NextRequest): boolean {
    const apiKey = req.headers.get("x-api-key");
    return !apiKey || apiKey !== process.env.NEXT_PUBLIC_TODOS_API_KEY;
}

export async function POST(req: NextRequest) {
    // Check API key
    if (checkApiKey(req)) {
        return NextResponse.json("Unauthorized access", { status: 401 });
    }

    try {
        await dbConnect();

        // Find all users who have isAssign false and isBlock false
        const users:userTypes[] = await userModel.find({ isAssign: true, isBlock: false });
        const todosData = await req.json();

        // Save the todo to the todo schema
        const savedTodo:TodosTypes | any = await new TodoModel(todosData).save();

        // Get the ID of the saved todo and convert it to a string
        let todoId2 = savedTodo._id.toString();

        // Map over all users and set this id to their schema
        const updateUserPromises = users.map((user:any) => {
            user.todos.push({ todoId: todoId2, isComplete: false, isVisited: false });
            return user.save();
        });

        // Await all update operations
        await Promise.all(updateUserPromises);

        return NextResponse.json({ message: "Todos saved successfully" }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ message: "Internal error! Try again", error: error.message }, { status: 500 });
    }
}
