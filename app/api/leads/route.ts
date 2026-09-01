import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  try {
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
