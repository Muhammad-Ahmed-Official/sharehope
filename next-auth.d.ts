import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User{
        _id?: string;
        userName?: string;
        email: string;
    };

    interface Session {
        user: {
            id?: string;
            userName?: string;
            email: string;
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        userName?: string; 
        email: string;
    }
}