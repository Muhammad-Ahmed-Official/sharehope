import { db } from "@/lib/db";
import { NgoUsers } from "@/lib/db/schema";
import { asyncHandler } from "@/utils/AsyncHandler";
import { nextResponse } from "@/utils/Responses";
import bcrypt from "bcryptjs";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (request: NextRequest): Promise<NextResponse> => {
    const { userName, email, password, ngoId } = await request.json();
    if(!userName || !email || !password || !ngoId) return nextResponse(400, "Missing Fields");

    const existing = await db.select().from(NgoUsers).where(eq(NgoUsers.email, email)).limit(1).then((res) => res[0] ?? null);
    if (existing) return nextResponse(409, "User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const [data] = await db.insert(NgoUsers).values({ userName, email, password:hashedPassword, ngoId }).returning();
    return nextResponse(201, "", data ?? null);
});
