import { asyncHandler } from "@/utils/AsyncHandler";
import { nextResponse } from "@/utils/Responses";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (request: NextRequest):Promise<NextResponse> => {
    

    return nextResponse(200, "")
})