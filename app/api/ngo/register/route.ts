import { db } from "@/lib/db";
import { NgoTable } from "@/lib/db/schema";
import { sendEmailNgo } from "@/lib/nodemailer";
import { asyncHandler } from "@/utils/AsyncHandler";
import { nextError, nextResponse } from "@/utils/Responses";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (request: NextRequest):Promise<NextResponse> => {
    const body = await request.json()
    const [data] = await db.insert(NgoTable).values(body).returning();
    
    const emailResponse = await sendEmailNgo(body.email, body.ngoName);

    if (emailResponse) {
      return nextResponse(200, `Email sent to ${body.email}`, data ?? null);
    } else {
      return nextError(500, "Failed to send email");
    }
})