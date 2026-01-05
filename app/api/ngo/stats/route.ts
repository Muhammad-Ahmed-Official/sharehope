import { db } from "@/lib/db";
import { DonationTable, NgoTable } from "@/lib/db/schema";
import { asyncHandler } from "@/utils/AsyncHandler";
import { nextResponse } from "@/utils/Responses";
import { count, sum } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (request: NextRequest): Promise<NextResponse> => {
    const [ngoResult, donationResult] = await Promise.all([
        db.select({ total: count() }).from(NgoTable),
        db.select({ total: sum(DonationTable.amount) }).from(DonationTable)
    ]);

    return nextResponse(200, "", { totalNgo: ngoResult[0]?.total ?? 0, totalDonation: donationResult[0]?.total ?? 0 } );
})