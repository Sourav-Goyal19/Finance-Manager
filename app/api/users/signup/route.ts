import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/db/drizzle";
import { usersTable } from "@/db/schema";
import { Resend } from "resend";
import { eq } from "drizzle-orm";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);

    const [user] = await db
      .insert(usersTable)
      .values({
        name,
        email,
        password: hashedPassword,
        // otp,
        // otpExpiry,
      })
      .returning();

    // await resend.emails.send({
    //   from: "onboarding@resend.dev",
    //   to: email,
    //   subject: "Verify your email",
    //   html: `Your OTP is: ${otp}`,
    // });

    return NextResponse.json(
      { message: "User created  successfully. Please Login." },
      { status: 201 }
    );
  } catch (error) {
    console.error("SIGNUP[POST]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
