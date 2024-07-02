import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}
if (!process.env.MONGODB_URI) {
    throw new Error('Please add your MongoDB URI to .env.local');
}
const connection: ConnectionObject = {}


async function dbConnect(): Promise<void> { // void means i don't care what type of promise it will return
    if (connection.isConnected) {
        console.log("database is already connected");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI!);// ! means i am 100% sure that it will give data
        connection.isConnected = db.connections[0].readyState;
        console.log("database connected successfully!")
    } catch (error) {
        console.log("unable to connect to database,please try again!", error);
        process.exit(1);
    }
}

export default dbConnect