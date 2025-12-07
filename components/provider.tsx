'use client'

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export default function Provider({ children } : { children : ReactNode }) {
    return(
        <SessionProvider refetchInterval={5*60} refetchOnWindowFocus={false}> {children} </SessionProvider>
    )
}