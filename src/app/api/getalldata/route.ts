import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/app/dbconnects/dbConnects';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// Make secure API
function apiCheck(req: NextRequest) {
    const apiKey = req.headers.get("x-api-key");
    return !apiKey || apiKey !== process.env.GET_API_ROUTE_USER!;
}

export async function GET(req: NextRequest) {
    if (apiCheck(req)) {
        return NextResponse.json("Unauthorized access", { status: 401 });
    }

    try {
        await dbConnect();

        // Decode token from cookies
        const token = req.cookies.get('token')?.value || ""

        let userId;
        if (token) {
            const tokeData: any = jwt.verify(token, process.env.TOKEN_SECREAT!);
            userId = tokeData // or email
        }
        // Debugging: Print the token
        console.log("Token:", token);
        console.log("userId:", userId);

        return NextResponse.json("success", { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}




// import { NextResponse, NextRequest } from "next/server";
// import dbConnect from "@/app/dbconnects/dbConnects";
// import TodoModel from "@/app/models/Todos";
// import UserModel from "@/app/models/signup";
// import { cookies } from 'next/headers';
// import jwt from 'jsonwebtoken';

// // Make secure API
// function apiCheck(req: NextRequest) {
//     const apiKey = req.headers.get("x-api-key");
//     return !apiKey || apiKey !== process.env.GET_API_ROUTE_USER!;
// }

// export async function GET(req: NextRequest) {
//     if (apiCheck(req)) {
//         return NextResponse.json("Unauthorized access", { status: 401 });
//     }

//     try {
//         await dbConnect();

//         // Decode token from cookies
//         const cookieStore = cookies();
//         const tokenCookie = cookieStore.get('token');

//         if (!tokenCookie) {
//             return NextResponse.json("Token expired", { status: 401 });
//         }

//         const token = tokenCookie.value;

//         const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
//         const userId = decoded.userId;

//         // Find user by ID and get todos array
//         const user = await UserModel.findById(userId);

//         if (!user) {
//             return NextResponse.json("User not found", { status: 404 });
//         }

//         // Extract todoIds from user's todos array
//         const todoIds = user.todos.map(todo => todo.todoId);

//         // Fetch todos from TodoModel using the extracted todoIds
//         const todos = await TodoModel.find({ _id: { $in: todoIds } });

//         return NextResponse.json(todos, { status: 200 });
//     } catch (error) {
//         console.error("Error:", error);
//         return NextResponse.json("Internal server error", { status: 500 });
//     }
// }
