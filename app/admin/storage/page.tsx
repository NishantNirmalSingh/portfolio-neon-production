import { list } from "@vercel/blob";
import BlobDeleteButton from "@/components/admin/BlobDeleteButton";
import { FileText, Database } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function StorageDashboard() {
  let blobs: any[] = [];
  let errorMsg = null;

  try {
    // Only fetch if token is available
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const response = await list();
      blobs = response.blobs;
    } else {
      errorMsg = "Vercel Blob token is missing from environment variables.";
    }
  } catch (err: any) {
    errorMsg = "Failed to fetch storage items. Please ensure your BLOB_READ_WRITE_TOKEN is fully configured.";
  }

  // Calculate total space used in MB
  const totalBytes = blobs.reduce((acc, blob) => acc + blob.size, 0);
  const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            Storage Manager <span className="text-xs bg-[#00f0ff]/20 text-[#00f0ff] px-2 py-0.5 rounded-full">{blobs.length} files</span>
          </h1>
          <p className="text-white/50">Manage uploaded PDF briefs and free up space.</p>
        </div>
        
        <div className="glass px-4 py-3 rounded-xl flex items-center gap-3 border border-[#00f0ff]/20 bg-[#00f0ff]/5">
          <Database className="text-[#00f0ff]" size={20} />
          <div>
            <div className="text-xs text-white/50">Space Used</div>
            <div className="font-mono font-bold text-lg text-white">{totalMB} MB <span className="text-sm text-white/30 font-sans font-normal">/ 250 MB Free Plan</span></div>
          </div>
        </div>
      </div>

      {errorMsg ? (
        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
          {errorMsg}
        </div>
      ) : blobs.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center text-white/40">
          No files uploaded yet.
        </div>
      ) : (
        <div className="glass border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider">File Details</th>
                  <th className="px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider">Uploaded</th>
                  <th className="px-6 py-4 text-xs font-semibold text-white/50 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {blobs.map((blob) => (
                  <tr key={blob.url} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/5 rounded-lg flex-shrink-0">
                          <FileText size={18} className="text-white/70" />
                        </div>
                        <div className="overflow-hidden">
                          <a href={blob.url} target="_blank" rel="noreferrer" className="text-sm font-medium text-white hover:text-[#00f0ff] truncate block hover:underline">
                            {blob.pathname}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-mono text-white/70">{(blob.size / 1024).toFixed(1)} KB</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-white/50">{new Date(blob.uploadedAt).toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end">
                        <BlobDeleteButton url={blob.url} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
