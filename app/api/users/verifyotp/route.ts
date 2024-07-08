import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextResponse) {
  try {
    const { email, otp } = await request.json();

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.otp !== otp || !user.otpExpiry) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    if (new Date() > user.otpExpiry) {
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    await db
      .update(usersTable)
      .set({
        emailVerified: new Date(),
        otp: null,
        otpExpiry: null,
      })
      .where(eq(usersTable.id, user.id));

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
