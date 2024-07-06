import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/dbconnects/dbConnects";
import userModel from "@/app/models/signup";
import productModel from "@/app/models/Products";
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

function apiCheck(req: NextRequest) {
    const apiKey = req.headers.get("x-api-key");
    return !apiKey || apiKey !== process.env.PRODUCTS_API_KEY_CHECK;
}

export async function POST(req: NextRequest, res: NextResponse) {
    if (!apiCheck(req)) {
        return NextResponse.json("Unauthorized access", { status: 401 })
    }
    try {
        await dbConnect();
        const productsData:any = await req.json();
        const Products:any = new productModel({
            title: productsData.title,
            price: productsData.price,
            category: productsData.category,
        });
        // save to db
        const savedproducts:any = await Products.save();
        // get id of this products
        const savedId:any = await savedproducts._id.toString();

        // get user based on cookies
        const token:any = req.cookies.get('token')?.value || "";
        // decode token
        let userId;
        if (token) {
            const tokenData: any = jwt.verify(token, process.env.TOKEN_SECREAT!);
            userId = tokenData.id; // Assuming the token contains the user ID as 'id'
        };
        if (!userId) {
            return NextResponse.json("Token not found", { status: 404 })
        };
        // find user based on this token id
        const user:any = await userModel.findOne({ _id: userId })
        if (!user) {
            return NextResponse.json("User not found", { status: 200 })
        };
        // Save product id to user schema
        user.products.push({ productId: savedId });
        await user.save(); // Save the updated user document
        return NextResponse.json("Products added successfully!", { status: 200 })
    } catch (error) {
        return NextResponse.json("internal server error", { status: 500 })
    }
}