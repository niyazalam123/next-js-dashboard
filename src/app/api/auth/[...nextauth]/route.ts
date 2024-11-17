import dbConnect from "@/app/dbconnects/dbConnects";
import UserModel from "@/app/models/user-craetions-schema/UserSchema";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials: any) {
                const { email, password } = credentials;

                // Validate inputs before querying the database
                if (!email || !password) {
                    throw new Error("Email and password are required");
                }

                try {
                    // Connect to database
                    await dbConnect();

                    // Find user by email
                    const user = await UserModel.findOne({ email });

                    // User does not exist
                    if (!user) {
                        throw new Error("No user found with this email");
                    }

                    // Check password match
                    const isPasswordMatched = await bcrypt.compare(password, user.password);

                    if (!isPasswordMatched) {
                        throw new Error("Invalid password");
                    }

                    // If everything is correct, return the user object
                    return user;
                } catch (error:any) {
                    console.error("Error during authorization: ", error.message);
                    throw new Error("Authentication failed, please try again");
                }
            },
        }),
    ],
    session: {
        strategy: "jwt", // JWT session is usually preferred for scalability
    },
    secret: process.env.NEXT_AUTH_SECRET, // Ensure this is set in .env
    pages: {
        signIn: "/user-creation-id/signin", // Custom sign-in page
    },
    callbacks: {
        async jwt({ token, user }:any) {
            if (user) {
                // Add user details to JWT token payload
                token.id = user._id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }:any) {
            // Attach the token payload to the session object
            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
