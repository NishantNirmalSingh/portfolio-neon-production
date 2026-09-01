import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET(req: Request) {
  try {
    const email = 'nirmalnishant.4245@gmail.com';
    const password = 'Nirmal@12345';
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.upsert({
      where: { email },
      update: { password: hashedPassword },
      create: {
        email,
        name: 'Admin',
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true, email: user.email });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
