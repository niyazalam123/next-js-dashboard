import dbConnect from "@/app/dbconnects/dbConnects";
import Review from "@/app/models/review";
import { NextResponse, NextRequest } from "next/server";
import randomColor from "randomcolor";


export async function POST(request: NextRequest) {
    const payLoad = await request.json();
    const { name, rating, review } = payLoad;

    if (!name || !rating || !review) {
        return NextResponse.json({ Message: "All fields are required!!!" }, { status: 499 })
    }

    // generate random bgColor
    const bgColor = randomColor({
        luminosity: 'dark',
    });

    await dbConnect();

    try {
        const reviewObj = new Review({
            name:name,
            rating:rating,
            review:review,
            bgColor:bgColor
        })

        await reviewObj.save();

        return NextResponse.json({Message:"Review has been saved successfully!!!"},{status:200})
    } catch (error) {
        console.log("review saving error",error);
        return NextResponse.json("Internal server error",{status:500})
    }
}


export async function GET(request:NextRequest){
    const { searchParams } = request.nextUrl;
    const limit = Number(searchParams.get("limit")) || 25;
    const page = Number(searchParams.get("page")) || 1;
    const offset = (page-1)*limit;


    await dbConnect();

    try {
        const reviews = await Review.find({isVerified:true})
        .limit(limit)
        .skip(offset)
        .sort({createdAt : -1});
        return NextResponse.json(reviews,{status:200});    
    } catch (error) {
        console.log("review fetching error",error);
        return NextResponse.json({message:"Internal server error"},{status:500})
    }
}