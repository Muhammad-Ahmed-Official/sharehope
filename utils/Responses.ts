import { NextResponse } from "next/server"
import { ApiResponse } from "./ApiResponse";


export const nextResponse = (statusCode: number, message?: string, data: any = null) => {
  return NextResponse.json( 
    new ApiResponse(statusCode, message ?? "", data), {status: statusCode} 
  )
};



export const nextError = (statusCode: number, message: string, data: any = null) => {
  return NextResponse.json(
    { status:statusCode, message:message, data}, { status: statusCode }
  )
};