"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { del } from "@vercel/blob";
import { getSession } from "@/lib/auth";

export async function updateLeadStatus(id: string, newStatus: string) {
  try {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized access detected");
    await db.lead.update({
      where: { id },
      data: { status: newStatus },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to update status", error);
    return { error: "Failed to update status" };
  }
}

export async function deleteLeadAndStorage(id: string, attachmentUrl: string | null) {
  try {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized access detected");

    // 1. Delete associated PDF file from Vercel Blob if exists
    if (attachmentUrl) {
      await del(attachmentUrl);
    }

    // 2. Delete database record
    await db.lead.delete({
      where: { id },
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete lead and storage", error);
    return { error: "Failed to securely delete lead information" };
  }
}

export async function deleteBlobAction(url: string) {
  try {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized access detected");

    // 1. Delete the actual file from Vercel Blob
    await del(url);

    // 2. Nullify the attachmentUrl in the database if a lead owns it
    // Using Prisma updateMany just in case multiple leads share the same URL by some glitch
    await db.lead.updateMany({
      where: { attachmentUrl: url },
      data: { attachmentUrl: null },
    });

    revalidatePath("/admin/storage");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete blob", error);
    return { error: "Failed to delete file from storage" };
  }
}

