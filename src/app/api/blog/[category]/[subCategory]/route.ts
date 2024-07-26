import Blog from "@/app/models/BlogModel";
import dbConnect from "@/app/dbconnects/dbConnects";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
    const { category, subCategory } = params;
    console.log("params",params)
    try {
        await dbConnect();
        // get query parameter
        const { searchParams }: any = new URL(req.url);
        const limit = parseInt(searchParams.get("limit") || 12);
        const page = parseInt(searchParams.get("page") || 1);
        const subCategoryData = await Blog.find({ subCategory }).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit);

        const totalDocument = await Blog.countDocuments({subCategory});
        const totalPage = Math.ceil(totalDocument/limit);
        return NextResponse.json({subCategoryData,totalDocument,totalPage},{status:200})
    } catch (error) {
        return NextResponse.json("internal server error", { status: 500 })
    }
}