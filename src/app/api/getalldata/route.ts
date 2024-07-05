import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/app/dbconnects/dbConnects';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import TodoModel from "@/app/models/Todos";
import UserModel from "@/app/models/signup";

// Make secure API
function apiCheck(req: NextRequest) {
    const apiKey = req.headers.get("x-api-key");
    return !apiKey || apiKey !== process.env.GET_API_ROUTE_USER!;
}

export async function GET(req: NextRequest) {
    if (!apiCheck(req)) {
        return NextResponse.json("Unauthorized access", { status: 401 });
    }

    try {
        await dbConnect();

        // Decode token from cookies
        const token = req.cookies.get('token')?.value || "";

        let userId;
        if (token) {
            const tokenData: any = jwt.verify(token, process.env.TOKEN_SECREAT!);
            userId = tokenData.id; // Assuming the token contains the user ID as 'id'
        }

        if (!userId) {
            return NextResponse.json("Token not found", { status: 404 });
        }

        // Find user based on token id
        const user = await UserModel.findOne({ _id: userId });

        // Check if user exists
        if (!user) {
            return NextResponse.json("User not found", { status: 404 });
        }

        // Extract todos array from user schema
        const todosArray = user.todos;

        // Find todos in TodoModel that match the todoIds
        const todoIds = todosArray.map(todo => todo.todoId);
        const matchedTodos = await TodoModel.find({ _id: { $in: todoIds } });

        // Combine user todos with matched todos
        const combinedTodos = matchedTodos.map((todo:any) => {
            const userTodo = todosArray.find((t:any) => t.todoId.toString() === todo._id.toString());
            return {
                todoId: todo,
                isComplete: userTodo?.isComplete,
                isVisited: userTodo?.isVisited,
            };
        });

        return NextResponse.json({ combinedTodos, userId }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}
