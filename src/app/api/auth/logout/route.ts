import { NextResponse,NextRequest } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json("Logout Successfully",{status:200});
        response.cookies.set("token","",{httpOnly:true,expires:new Date(0)})
    } catch (error) {
        return NextResponse.json("internal server error",{status:500});
    }
}