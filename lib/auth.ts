import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NgoUsers } from "./db/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                identifier: { label: "Email/Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials){
                if (!credentials?.identifier || !credentials?.password) {
                    throw new Error("Missing email and password")
                }
                try {
                    const user = await db.select().from(NgoUsers).where(eq(NgoUsers.email, credentials.identifier)).limit(1).then((res) => res[0] ?? null)
                    if(!user) throw new Error("No user found with this email or username");

                    const isPasswordCorrect = await bcrypt.compare(credentials?.password, user.password);
                    if(isPasswordCorrect){
                        return user;
                    } else{
                      throw new Error("Incorrect Password");
                    }

                } catch (err: any) {
                   throw new Error(err.message || "Something went wrong during authentication");
                };
            }
        })
    ],
    callbacks: {
        async jwt({token, user}){
            if (user) {
                token._id = user._id?.toString();
                token.userName = user?.userName; 
                token.email = user?.email;   
            };
            return token;
        },
        async session({session, token}){
            if(session.user){
                session.user.id = token._id as string;
                session.user.userName = token.userName;
                session.user.email = token.email;
            };
            return session;
        },
    },
    pages: {
        signIn: "auth/SignIn",
        error: "auth/SignIn",
    },
    session: {
        strategy: "jwt",
        maxAge: 30*24*3600,
    },
    secret: process.env.NEXTAUTH_SECRET,
}