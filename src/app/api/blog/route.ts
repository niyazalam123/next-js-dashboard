import Blog from "@/app/models/BlogModel";
import dbConnect from "@/app/dbconnects/dbConnects";
import { NextRequest, NextResponse } from "next/server";




export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '1', 10);
        const blogs = await Blog.find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip((page - 1) * limit)

        const totalBlogs = await Blog.countDocuments();
        const totalPages = Math.ceil(totalBlogs / limit);
        return NextResponse.json({ blogs, totalPages,totalBlogs }, { status: 200 })
    } catch (error) {
        return NextResponse.json("unable to fetch data", { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { title, metaDescription, metaKeyWords, category, subCategory, html, img } = await req.json();
    try {
        await dbConnect();
        // create new object for saving in mongodb
        const blog = new Blog({
            title: title,
            metaDescription: metaDescription,
            metaKeyWords: metaKeyWords,
            category: category,
            subCategory: subCategory,
            html: html,
            img: img
        })
        // save data to mongo
        await blog.save();
        return NextResponse.json("Blog data submitted successfully", { status: 200 })
    } catch (error) {
        return NextResponse.json("internal server error", { status: 500 })
    }
}