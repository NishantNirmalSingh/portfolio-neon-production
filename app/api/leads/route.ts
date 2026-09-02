import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { put } from "@vercel/blob";
import { headers } from "next/headers";

// Basic In-Memory Rate Limiter (Protects this specific Vercel local node instance)
const rateLimitMap = new Map<string, { count: number; expires: number }>();
const MAX_LEADS = 30;
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

    const body = await req.json();

    let attachmentUrl = null;

    if (body.fileData && body.fileName) {
      const safeName = body.fileName.replace(/[^a-zA-Z0-9.\-_]/g, "");
      
      // base64Str format is usually "data:application/pdf;base64,JVBERi..."
      // We extract just the base64 part content
      const base64Content = body.fileData.includes(',') 
        ? body.fileData.split(',')[1] 
        : body.fileData;
        
      const buffer = Buffer.from(base64Content, 'base64');
      const blob = await put(`leads/${Date.now()}_${safeName}`, buffer, {
        access: "public",
        addRandomSuffix: false,
      });
      attachmentUrl = blob.url;
    }

    // Prepare text data
    const data = {
      projectType: body.projectType as string,
      projectName: body.projectName as string,
      projectDescription: body.projectDescription as string,
      estimatedBudget: body.estimatedBudget as string,
      targetDeadline: body.targetDeadline as string,
      name: body.name as string,
      email: body.email as string,
      phone: body.phone as string || null,
      company: body.company as string || null,
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
  } catch (error: any) {
    console.error("Lead submission error:", error);
    return NextResponse.json({ error: "Debug Error: " + (error.message || String(error)) }, { status: 500 });
  }
}
