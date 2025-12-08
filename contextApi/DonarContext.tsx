'use client'

import { apiClient } from "@/lib/apiClient";
import { asyncHandlerFront } from "@/utils/FrontAsyncHadler";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type DonarsType = {
  id: string;
  fullName:string;
  createdAt: any;
  amount: number;
  cause: string;
};
type DonarsContextType = {
  donarsData: DonarsType[];
};

const DonarsContext = createContext<DonarsContextType | undefined>(undefined);

export const DonarsProvider = ({ children } : { children: ReactNode}) => {
    const [donarsData, setDonarsData] = useState<DonarsType[]>([]);

    const fetchNgo = async () => {
        await asyncHandlerFront(
            async() => {
                const response:any = await apiClient.donar();
                setDonarsData(response.data);
            },
            (error:any) => {
                toast.error("Something went wrong", error.message)
            }
        )
    }

    useEffect(() => {
        fetchNgo();
    }, [])

    return(
        <DonarsContext.Provider value={{ donarsData }}>
            { children }
        </DonarsContext.Provider>
    )
};


export const useDonar = () => {
    const context = useContext(DonarsContext);
    if(!context) throw new Error("useNgo must be used within a DonarsProvider");
    return context;
}