import { db } from "@/lib/db";
import LeadCard from "@/components/admin/LeadCard";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const leads = await db.lead.findMany({
    orderBy: {
      createdAt: 'desc',
    }
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          Project Leads <span className="text-xs bg-[#00f0ff]/20 text-[#00f0ff] px-2 py-0.5 rounded-full">{leads.length}</span>
        </h1>
        <p className="text-white/50">Manage incoming project requests</p>
      </div>

      {leads.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center text-white/40">
          No leads yet. They will appear here once someone submits a request.
        </div>
      ) : (
        <div className="grid gap-4">
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </div>
  );
}
