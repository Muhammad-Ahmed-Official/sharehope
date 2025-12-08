import { db } from "@/lib/db";
import { DonarTable, DonationCauseTable, DonationTable, NgoTable } from "@/lib/db/schema";
import { sendEmailDonar } from "@/lib/nodemailer";
import { asyncHandler } from "@/utils/AsyncHandler";
import { nextError, nextResponse } from "@/utils/Responses";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (request: NextRequest): Promise<NextResponse> => {
    const { searchParams } = new URL(request.url)
    const body = await request.json();
    const totalAmount = Number(body.donation);
    const causes: string[] = body.causes;
    const amountPerCause = totalAmount / causes.length;
    const ngoId = searchParams.get("ngoId")
    // 2️⃣ Insert donation
    const ngo = await db.select().from(NgoTable).where(eq(NgoTable.id, ngoId as string)).then(res => res[0] ?? null);
    if (!ngo) {
      return nextError(400, "Invalid NGO selected");
    }

    // 1️⃣ Insert donor if not exists
    let donor = await db.select().from(DonarTable).where(eq(DonarTable.email, body.email)).then(res => res[0] ?? null);
    if (!donor) {
        [donor] = await db.insert(DonarTable).values({ fullName: body.fullName, email: body.email, phone: body.phone }).returning();
    };

    const [donation] = await db.insert(DonationTable).values({ donarId: donor.id, ngoId, amount: totalAmount }).returning();

    // 3️⃣ Insert causes
    const donationCauseRows = causes.map((cause) => ({ donationId: donation.id, cause }));
    await db.insert(DonationCauseTable).values(donationCauseRows);

    const emailResponse = await sendEmailDonar(body.email, body.fullName, ngo.ngoName, totalAmount);

    if (emailResponse) {
      return nextResponse(200, `Email sent to ${body.email}`);
    } else {
      return nextError(500, "Failed to send email");
    }
});
