"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteBlobAction } from "@/app/admin/actions";

export default function BlobDeleteButton({ url }: { url: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm("Are you securely confirming the deletion of this file from Vercel Blob permanently?")) {
      startTransition(() => {
        deleteBlobAction(url);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className={`bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-lg transition-colors flex items-center justify-center ${isPending ? "opacity-50 pointer-events-none" : ""}`}
      title="Delete file permanently"
    >
      {isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
}
