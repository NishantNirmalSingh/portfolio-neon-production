"use client";

import { FileText, ExternalLink, Clock, Trash2 } from "lucide-react";
import { updateLeadStatus, deleteLeadAndStorage } from "@/app/admin/actions";
import { useTransition } from "react";

interface Lead {
  id: string;
  projectType: string;
  projectName: string;
  projectDescription: string;
  estimatedBudget: string;
  targetDeadline: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  attachmentUrl: string | null;
  status: string;
  createdAt: Date;
}

export default function LeadCard({ lead }: { lead: Lead }) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    startTransition(() => {
      updateLeadStatus(lead.id, newStatus);
    });
  };

  const handleDelete = () => {
    if (window.confirm(`Are you absolutely sure you want to delete the lead from ${lead.name}? This will permanently delete their PDF description to free up space.`)) {
      startTransition(() => {
        deleteLeadAndStorage(lead.id, lead.attachmentUrl);
      });
    }
  };

  return (
    <div className={`glass rounded-xl p-5 md:p-6 transition-all hover:border-[rgba(0,240,255,0.3)] ${isPending ? "opacity-50 pointer-events-none" : ""}`}>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        
        {/* Left col */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-white">{lead.projectName}</h3>
            <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
              lead.status === "new" ? "bg-amber-500/20 text-amber-300" :
              lead.status === "contacted" ? "bg-blue-500/20 text-blue-300" :
              "bg-emerald-500/20 text-emerald-300"
            }`}>
              {lead.status}
            </span>
          </div>
          
          <div className="text-sm text-white/50 space-y-1 mb-4">
            <p><strong className="text-white/70">Client:</strong> {lead.name} ({lead.email}) {lead.phone && `- ${lead.phone}`}</p>
            <p><strong className="text-white/70">Type:</strong> {lead.projectType}</p>
            <p><strong className="text-white/70">Budget:</strong> {lead.estimatedBudget}</p>
          </div>
          
          <div className="bg-white/[0.03] p-4 rounded-lg border border-white/5 text-sm text-white/80">
            {lead.projectDescription}
          </div>
        </div>

        {/* Right col */}
        <div className="flex flex-col items-start md:items-end gap-3 min-w-[200px]">
          <div className="text-xs text-white/40 flex items-center gap-1.5">
            <Clock size={14} />
            {new Date(lead.createdAt).toLocaleDateString()}
          </div>
          
          {lead.attachmentUrl && (
            <a 
              href={lead.attachmentUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-[#00f0ff] hover:underline bg-[#00f0ff]/10 px-3 py-2 rounded-lg transition-colors"
            >
              <FileText size={16} /> View Brief
              <ExternalLink size={12} />
            </a>
          )}

          <div className="mt-auto w-full md:w-auto flex flex-col gap-2 pt-4 md:pt-0">
            <select 
              value={lead.status}
              onChange={handleStatusChange}
              disabled={isPending}
              className="bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2 focus:outline-none focus:border-[#00f0ff]/50 w-full md:w-auto"
            >
              <option value="new">Mark as New</option>
              <option value="contacted">Mark as Contacted</option>
                  <option value="closed">Mark as Closed</option>
                </select>
                
                <button
                  onClick={handleDelete}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-sm px-3 py-2 flex items-center justify-center gap-2 transition-colors w-full md:w-auto mt-2"
                  title="Permanently delete lead and PDF"
                >
                  <Trash2 size={16} /> Delete Data
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
