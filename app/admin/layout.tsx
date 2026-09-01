"use client";

import Link from "next/link";
import { ArrowLeft, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  // If not logged in (e.g., login page), don't show the sidebar
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-[#02020f]">{children}</div>;
  }

  async function handleSignOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#02020f] flex flex-col md:flex-row">
      {/* Sidebar - hidden on mobile, visible on md+ */}
      <aside className="w-full md:w-64 border-r border-white/10 bg-white/[0.02] flex flex-col p-6 hidden md:flex">
        <div className="mb-10 flex items-center justify-between">
          <span className="neon-text font-mono font-bold text-lg">Admin</span>
          <Link href="/" className="text-white/40 hover:text-white transition-colors" title="Back to site">
            <ArrowLeft size={18} />
          </Link>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link href="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium border transition-colors ${pathname === '/admin' ? 'bg-[rgba(0,240,255,0.1)] text-[#00f0ff] border-[rgba(0,240,255,0.2)]' : 'text-white/50 hover:text-white hover:bg-white/5 border-transparent'}`}>
            <LayoutDashboard size={18} /> Leads
          </Link>
          <Link href="/admin/storage" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium border transition-colors ${pathname === '/admin/storage' ? 'bg-[rgba(0,240,255,0.1)] text-[#00f0ff] border-[rgba(0,240,255,0.2)]' : 'text-white/50 hover:text-white hover:bg-white/5 border-transparent'}`}>
            <Settings size={18} /> Storage
          </Link>
        </nav>
        
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-lg font-medium transition-colors mt-auto w-full text-left"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 max-h-screen overflow-auto">
        {children}
      </main>
    </div>
  );
}
