'use client'

import { ReactNode, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { DonarsProvider } from "@/contextApi/DonarContext";

export default function Provider({ children } : { children : ReactNode }) {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js");
        }
    }, []);

    return(
        <DonarsProvider>
            <SessionProvider refetchInterval={5*60} refetchOnWindowFocus={false}> 
                {children} 
            </SessionProvider>
        </DonarsProvider>
    )
}