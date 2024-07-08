import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

    const [user] = await db
      .update(usersTable)
      .set({ otp, otpExpiry })
      .where(eq(usersTable.email, email))
      .returning();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await resend.emails.send({
      from: "souravgoyal88820@gmail.com",
      to: email,
      subject: "Your new verification code",
      html: `Your new OTP is: ${otp}. This OTP is valid for 15 minutes.`,
    });

    return NextResponse.json({ message: "New OTP sent" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
