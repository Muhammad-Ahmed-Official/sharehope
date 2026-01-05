import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { DonarTable, DonationCauseTable, DonationTable, NgoTable, NgoUsers } from "@/lib/db/schema";
import { asyncHandler } from "@/utils/AsyncHandler";
import { nextError, nextResponse } from "@/utils/Responses";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (request: NextRequest):Promise<NextResponse> => {
    return nextResponse(200, "")
})

export const GET = asyncHandler(async (request: NextRequest):Promise<NextResponse> => {
    const session = await getServerSession(authOptions);
    if (session?.user?.email){
        const ngoUsers = await db.select().from(NgoUsers).where(eq(NgoUsers.email, session.user.email))
        const ngoUser = ngoUsers[0];
        if (!ngoUser) {
            return NextResponse.json({ message: "NGO user not found" }, { status: 404 });
        };  

        const donations = await db
        .select({
            donarName: DonarTable.fullName,
            amount: DonationTable.amount,
            createdAt: DonationTable.createdAt,
            cause: DonationCauseTable.cause,
        })
        .from(DonationTable)
        .leftJoin(DonarTable, eq(DonationTable.donarId, DonarTable.id))
        .leftJoin(DonationCauseTable, eq(DonationCauseTable.donationId, DonationTable.id))
        .where(eq(DonationTable.ngoId, ngoUser.ngoId));

        const formatted = donations.map((row) => ({
            fullName: row.donarName,
            amount: row.amount,
            createdAt: row.createdAt ? new Date(row.createdAt).toISOString().split("T")[0] : null,
            cause: row.cause ?? null,
        }));

        return nextResponse(200, "", formatted ?? null)
    } else{
        const rows = await db.select().from(DonarTable)
        .leftJoin(DonationTable, eq(DonationTable.donarId, DonarTable.id))
        .leftJoin(NgoTable, eq(NgoTable.id, DonationTable.ngoId)) ;
        const formatted = rows.map((row) => {
            return {
                ...row.Donar, 
                ...row.Donation,
                ngoName: row.Ngo?.ngoName ?? null,
                createdAt: row.Donation?.createdAt ? new Date(row.Donation.createdAt).toISOString().split("T")[0] : null,
            }
        }) 
        return nextResponse(200, "", formatted ?? null);
    }
})