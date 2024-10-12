import dbConnect from "@/app/dbconnects/dbConnects";
import ProductReview2 from "@/app/models/ReviewSchema";
import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
    const payLoad = await req.json();
    const { name, rating, review } = payLoad;

    if (!name || !rating || !review) {
        return NextResponse.json("all fields are required!!", { status: 400 })
    }
    await dbConnect();
    try {
        // make an obj to save in db
        const reviewObj = new ProductReview2({
            name,
            rating,
            review,
            like: 0,
            disLike: 0,
            replies: []
        });

        await reviewObj.save();
        return NextResponse.json("review added successfully!!!", { status: 200 })
    } catch (error) {
        console.log("error", error);
        return NextResponse.json("internal server error", { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const reviews = await ProductReview2.find();
        return NextResponse.json(reviews, { status: 200 });
    } catch (error) {
        console.log("error", error);
        return NextResponse.json("internal server error", { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = req.nextUrl;
        const reviewId = searchParams.get("id");
        const action = searchParams.get("actionBtn");

        if (!reviewId || !action){
            return NextResponse.json("review id and action btn is missing!!!",{status:404})
        }

        const id = new ObjectId(reviewId);
        const reviewObj = await ProductReview2.findById(id);

        if (!reviewObj){
            return NextResponse.json("no review is found with this id",{status:404})
        }

        if (action==="like"){
            reviewObj.like++
        }else{
            reviewObj.disLike++
        }

        await reviewObj.save();

        return NextResponse.json("action button is uodated successfully!!",{status:200});

    } catch (error) {
        console.log("error", error);
        return NextResponse.json("internal server error", { status: 500 })
    }
}