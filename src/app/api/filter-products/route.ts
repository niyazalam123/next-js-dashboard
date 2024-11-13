import dbConnect from "@/app/dbconnects/dbConnects";
import FilterProduct from "@/app/models/products-schema/FilterSchema"
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const payLoad = await req.json();
    const { title, price, color, size, image } = payLoad;
    if (!title || !price || !color || !size || !image) {
        return NextResponse.json("Please provide all the fileds", { status: 499 })
    };
    await dbConnect();
    try {
        const productSchema = new FilterProduct({
            title,
            price,
            color,
            size,
            image
        });
        await productSchema.save();
        return NextResponse.json("product added successfully", { status: 200 });
    } catch (error) {
        console.log("error", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        // extract query params
        const { searchParams } = new URL(req.url);
        const color = searchParams.get("color");
        const size = searchParams.get("size");
        const sort = searchParams.get("sort");
        const priceRange = searchParams.get("price");
        const query: any = {};
        if (color) query.color = color;
        if (size) query.size = size;

        // Determine sort order for price
        const priceSort = sort === "asc" ? 1 : sort === "des" ? -1 : undefined;

        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split("-").map(Number);
            query.price = { $gte: minPrice || 0, $lte: maxPrice || Infinity };
        }

        // now get data based on these data
        const products = await FilterProduct.find(query).sort(priceSort ? { price: priceSort } : {});
        if (products) {
            return NextResponse.json(products, { status: 200 })
        } else {
            return NextResponse.json("No data found with this id", { status: 404 });
        }
    } catch (error) {
        console.log("error", error);
        return NextResponse.json("Internal server error", { status: 500 });
    }
}