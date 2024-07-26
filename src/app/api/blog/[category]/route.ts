import Blog from "@/app/models/BlogModel";
import dbConnect from "@/app/dbconnects/dbConnects";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: any) {
    const { category } = params
    try {
        await dbConnect();
        //extract query para
        const { searchParams }: any = new URL(req.url);
        const limit: number = parseInt(searchParams.get("limit") || 12);
        const page: number = parseInt(searchParams.get("page") || 1);
        const totalCategoryProducts:any = await Blog.find({ category }).sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        const totalData = await Blog.countDocuments({category});
        const totalPage = Math.ceil(totalData/limit)
        return NextResponse.json({totalCategoryProducts,totalData,totalPage},{status:200})
    } catch (error) {
        return NextResponse.json("internal server error", { status: 500 })
    }
}