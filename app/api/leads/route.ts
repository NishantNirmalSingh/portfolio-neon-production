import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { put } from "@vercel/blob";
import { headers } from "next/headers";

// Basic In-Memory Rate Limiter (Protects this specific Vercel local node instance)
const rateLimitMap = new Map<string, { count: number; expires: number }>();
const MAX_LEADS = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export async function POST(req: Request) {
  try {
    const ip = headers().get("x-forwarded-for") || "unknown";
    const now = Date.now();
    
    // Check Rate Limit
    if (ip !== "unknown") {
      const current = rateLimitMap.get(ip);
      if (current && now < current.expires && current.count >= MAX_LEADS) {
         return NextResponse.json({ error: "Too many submissions, please wait a while before trying again" }, { status: 429 });
      }
      // Record attempt
      if (!current || now > current.expires) {
        rateLimitMap.set(ip, { count: 1, expires: now + WINDOW_MS });
      } else {
        current.count += 1;
      }
    }

    const formData = await req.formData();
    
    // Extract file
    const file = formData.get("file") as File | null;
    let attachmentUrl = null;

    if (file) {
      // Free Vercel Blob requires NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN to be set in environment
      // Ensure file name is purely alphanumeric/safe
      const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
      const blob = await put(`leads/${Date.now()}_${safeName}`, file, {
        access: "public",
        addRandomSuffix: false,
      });
      attachmentUrl = blob.url;
    }

    // Prepare text data
    const data = {
      projectType: formData.get("projectType") as string,
      projectName: formData.get("projectName") as string,
      projectDescription: formData.get("projectDescription") as string,
      estimatedBudget: formData.get("estimatedBudget") as string,
      targetDeadline: formData.get("targetDeadline") as string,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string || null,
      company: formData.get("company") as string || null,
      attachmentUrl,
    };

    // Save to database
    const lead = await db.lead.create({
      data: {
        ...data,
        status: "new",
      }
    });

    return NextResponse.json({ success: true, leadId: lead.id });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json({ error: "Failed to process lead" }, { status: 500 });
  }
}
