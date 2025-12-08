import { db } from "@/lib/db";
import { DonarTable, NgoTable } from "@/lib/db/schema";
import { asyncHandler } from "@/utils/AsyncHandler";
import { nextResponse } from "@/utils/Responses";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (request: NextRequest):Promise<NextResponse> => {
    const ngos = await db.select({
      id: NgoTable.id,
      orgName: NgoTable.ngoName,
      email: NgoTable.email,
      phone: NgoTable.phone,
      location: NgoTable.location,
      description: NgoTable.description,
    }).from(NgoTable)
    return nextResponse(200, "", ngos ?? null)
})