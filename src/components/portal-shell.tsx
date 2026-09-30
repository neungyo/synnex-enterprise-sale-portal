"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useLanguage } from "@/components/language-provider";

const primary = [
  ["dashboard", "ภาพรวม", "Dashboard", "/", "home"],
  ["customers", "ลูกค้า", "Customers", "/customers", "user"],
  ["opportunities", "โอกาสทางการขาย", "Opportunities", "/opportunities", "trophy"],
  ["activities", "กิจกรรม", "Activities", "/activities", "calendar"],
  ["reports", "รายงาน", "Reports", "/reports", "chart"],
  ["products", "สินค้า", "Products", "/products", "cube"],
  ["partners", "งาน", "Tasks", "/partners", "check"],
  ["team", "ทีมงาน", "Team", "/team", "users"],
] as const;
const management = [
  ["approvals", "อนุมัติ", "Approval", "/approvals", "file"],
  ["settings", "ตั้งค่า", "Settings", "/settings", "gear"],
] as const;

function NavIcon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    home: <><path d="m3 11 9-8 9 8v9H3z"/><path d="M9 20v-6h6v6"/></>,
    user: <><circle cx="12" cy="7" r="3"/><path d="M6 21v-2a6 6 0 0 1 12 0v2"/></>,
    users: <><circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 20a6 6 0 0 1 12 0M14 15c4-.4 6 1.6 7 5"/></>,
    trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4v2a3 3 0 0 0 4 3M16 6h4v2a3 3 0 0 1-4 3M12 13v4M8 21h8M9 17h6"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M8 14h3M8 18h6"/></>,
    chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>,
    cube: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9zM4 7.5 12 12l8-4.5M12 12v9"/></>,
    check: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="m8 12 2.5 2.5L16 9"/></>,
    file: <><path d="M6 3h8l4 4v14H6zM14 3v5h5M9 13h6M9 17h6"/></>,
    gear: <><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] shrink-0">{paths[name]}</svg>;
}

function BrandMark() {
  return <span className="relative h-7 w-9 shrink-0 overflow-hidden">
    <i className="absolute left-0 top-0 h-3 w-9 bg-[#aaaeb4] [clip-path:polygon(0_100%,16%_0,35%_100%,52%_0,72%_100%,100%_0,84%_100%)]" />
    <i className="absolute left-0 top-[12px] h-[3px] w-9 bg-[#ed263a]" />
    <i className="absolute left-0 top-[15px] h-[3px] w-9 bg-white" />
    <i className="absolute left-0 top-[18px] h-[3px] w-9 bg-[#00a35a]" />
    <i className="absolute left-0 top-[21px] h-[4px] w-9 bg-[#1681c8]" />
  </span>;
}

function NavLinks({ items, active, thai }: { items: typeof primary | typeof management; active: string; thai: boolean }) {
  return <>{items.map(([key, th, en, href, icon]) => <Link key={key} href={href} className={`flex h-11 items-center gap-3 rounded-[10px] px-4 text-[13px] transition ${active === key ? "bg-[#277cf4] font-semibold text-white shadow-[0_6px_18px_rgba(15,104,240,.38)]" : "text-slate-200 hover:bg-white/10 hover:text-white"}`}><NavIcon name={icon}/><span>{thai ? th : en}</span></Link>)}</>;
}

export function PortalShell({ active, children }: { active: string; children: ReactNode }) {
  const { language, setLanguage } = useLanguage();
  const thai = language === "th";
  return <div className="min-h-screen bg-[#f4f8fc] text-[#112a46]">
    <aside className="fixed inset-y-0 z-20 hidden w-[226px] flex-col overflow-hidden bg-[#102342] px-3 py-5 text-white lg:flex">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[47%] bg-[url('/sidebar-mountain.png')] bg-cover bg-center opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#102342] via-[#102c50]/95 to-[#06182e]/25" />
      <div className="relative mb-6 flex items-center gap-3 px-2">
        <BrandMark/><div><p className="text-[20px] font-black italic tracking-tight">SYNNEX</p><p className="-mt-1 text-[11px] text-slate-200">Sales Portal</p></div>
      </div>
      <nav className="relative space-y-1"><NavLinks items={primary} active={active} thai={thai}/></nav>
      <div className="relative mt-5"><p className="mb-2 px-4 text-[10px] font-semibold tracking-wide text-slate-400">MANAGEMENT</p><nav className="space-y-1"><NavLinks items={management} active={active} thai={thai}/></nav></div>
      <div className="relative mt-auto flex items-center gap-2 px-3 pb-1 text-[10px] font-bold text-white"><BrandMark/><span>SYNNEX<br/><small className="font-normal">TRUSTED TECHNOLOGY PARTNER</small></span></div>
    </aside>
    <main className="lg:ml-[226px]">
      <header className="flex h-[70px] items-center gap-4 border-b border-[#d9e8f4] bg-gradient-to-r from-[#edf7ff] to-[#d8ecfb] px-5 lg:px-7">
        <div className="hidden max-w-3xl flex-1 items-center gap-3 rounded-xl border border-white/80 bg-white/90 px-4 py-3 shadow-sm md:flex"><span className="text-blue-700">⌕</span><input className="w-full bg-transparent text-sm outline-none placeholder:text-[#7a97af]" placeholder={thai ? "ค้นหาลูกค้า, โอกาสการขาย, กิจกรรม, เอกสาร ..." : "Search customers, opportunities, activities, documents ..."}/></div>
        <div className="ml-auto flex items-center gap-3"><div className="flex rounded-xl border border-[#d9e5ef] bg-white/80 p-1 text-xs font-semibold"><button onClick={() => setLanguage("th")} className={`rounded-lg px-2 py-1 ${thai ? "bg-[#087bf3] text-white" : "text-[#66829b]"}`}>ไทย</button><button onClick={() => setLanguage("en")} className={`rounded-lg px-2 py-1 ${!thai ? "bg-[#087bf3] text-white" : "text-[#66829b]"}`}>EN</button></div><button className="relative grid h-10 w-10 place-items-center rounded-full bg-white/70 text-blue-700">♟<b className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-red-500 text-[10px] text-white">3</b></button><div className="hidden items-center gap-2 sm:flex"><span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#e7bf9c] to-[#71412c] text-sm font-bold text-white">N</span><div><p className="text-sm font-bold">NeuNgyo</p><p className="text-xs text-[#69869e]">Administrator</p></div><span className="text-blue-600">⌄</span></div></div>
      </header>
      <div className="p-5 lg:p-7">{children}</div>
    </main>
  </div>;
}
