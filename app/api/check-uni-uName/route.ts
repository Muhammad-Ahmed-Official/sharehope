import { db } from "@/lib/db";
import { NgoUsers } from "@/lib/db/schema";
import { userNameValidation } from "@/schema/signUpSchema";
import { asyncHandler } from "@/utils/AsyncHandler";
import { nextError, nextResponse } from "@/utils/Responses";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { z } from "zod";

const userNameQuerySchema = z.object({
    userName: userNameValidation,
})


export const POST = asyncHandler(async (request: NextRequest) => {
    const { searchParams } = new URL(request.url)
    const queryParam = {
        userName: searchParams.get("userName")
    }
    const result = userNameQuerySchema.safeParse(queryParam);
    if(!result.success){
        const userNameError = result.error.format().userName?._errors || [];
        return nextError(400, "Query Params not found", userNameError.length > 0 ? userNameError.join(', ') : 'Invalid query parameters')
    };
    
    const { userName } = result.data;
    const existingVerifiedUser = await db.select().from(NgoUsers).where(eq(NgoUsers.userName, userName));
    if(existingVerifiedUser.length > 0) return nextError(400, "Username already taken");
    return nextResponse(200, "userName is available");
})