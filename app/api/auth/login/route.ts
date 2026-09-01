import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { encrypt } from "@/lib/auth";
import { cookies, headers } from "next/headers";

// Basic In-Memory Rate Limiter (Protects this specific Vercel local node instance)
const rateLimitMap = new Map<string, { count: number; expires: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 mins

export async function POST(req: Request) {
  try {
    const ip = headers().get("x-forwarded-for") || "unknown";
    
    // Check Rate Limit
    const limit = rateLimitMap.get(ip);
    const now = Date.now();
    if (limit && now < limit.expires && limit.count >= MAX_ATTEMPTS) {
      return NextResponse.json({ error: "Too many attempts, please try again later" }, { status: 429 });
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      logFailedAttempt(ip, now);
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      logFailedAttempt(ip, now);
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Success - reset attempts
    rateLimitMap.delete(ip);

    // Generate JWT
    const sessionToken = await encrypt({ id: user.id, email: user.email });

    // Set cookie
    cookies().set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

function logFailedAttempt(ip: string, now: number) {
  if (ip === "unknown") return;
  const current = rateLimitMap.get(ip);
  if (!current || now > current.expires) {
    rateLimitMap.set(ip, { count: 1, expires: now + WINDOW_MS });
  } else {
    current.count += 1;
  }
}
