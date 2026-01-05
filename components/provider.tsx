'use client'

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { DonarsProvider } from "@/contextApi/DonarContext";

export default function Provider({ children } : { children : ReactNode }) {

    return(
        <DonarsProvider>
            <SessionProvider refetchInterval={5*60} refetchOnWindowFocus={false}> 
                {children} 
            </SessionProvider>
        </DonarsProvider>
    )
}