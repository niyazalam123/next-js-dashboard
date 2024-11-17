import dbConnect from "@/app/dbconnects/dbConnects";
import UserModel from "@/app/models/user-craetions-schema/UserSchema";
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


// function for email setUp 
async function sendResetEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD, 
        },
    });

    const mailOptions = {
        from:process.env.EMAIL_ADDRESS,
        to: email,
        subject: "Reset your password", 
        html: `<b>Click here to reset your password: <a href="http://localhost:3000/user-creation-id/reset-password?token=${token}">Reset Password</a></b>`, // HTML body with dynamic token
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export async function POST(req: NextRequest) {
    const payLoad = await req.json();
    await dbConnect();
    try {
        const { email } = payLoad;
        if (!email) {
            return NextResponse.json("Please Provide email address", { status: 400 })
        }
        // check valid email or not
        if (!emailRegex.test(email)) {
            return NextResponse.json("Invalid email format", { status: 400 });
        }

        const user = await UserModel.findOne({email: email});
        if (!user) {
            return NextResponse.json("No user found with this email", { status: 400 })
        }
        // create a random string
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.forgotPasswordToken = resetToken;
        user.forgotPasswordTokenExpiry = Date.now() + 3600000   // valid for 1 hour

        await user.save();

        // function for email send
        await sendResetEmail(email, resetToken);
        return NextResponse.json("Password reset email sent", { status: 200 })
    } catch (error: any) {
        console.log("error", error);
        return NextResponse.json({ messeage: "Internal sever error", error: error.messeage }, { status: 500 })
    }
}