"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";

type Stage = { name: string; count: number; value: number; color: string };
type RankedRow = { name: string; value: number; count: number; mark: string };

const stages: Stage[] = [
  { name: "Lead / New", count: 18, value: 42.6, color: "#2f80ed" },
  { name: "Qualified", count: 16, value: 68.4, color: "#2898f0" },
  { name: "Solution / Proposal", count: 14, value: 102.5, color: "#13b78b" },
  { name: "Negotiation", count: 12, value: 76.2, color: "#f5b323" },
  { name: "Closing", count: 8, value: 45.1, color: "#f47a28" },
  { name: "Won", count: 22, value: 120.4, color: "#f04455" },
];

const months = [
  { label: "Jan", pipeline: 42, weighted: 28, count: 14 },
  { label: "Feb", pipeline: 48, weighted: 31, count: 15 },
  { label: "Mar", pipeline: 63, weighted: 45, count: 19 },
  { label: "Apr", pipeline: 51, weighted: 34, count: 16 },
  { label: "May", pipeline: 57, weighted: 39, count: 17 },
  { label: "Jun", pipeline: 67, weighted: 47, count: 20 },
  { label: "Jul", pipeline: 86, weighted: 63, count: 25 },
  { label: "Aug", pipeline: 78, weighted: 52, count: 26 },
  { label: "Sep", pipeline: 96, weighted: 66, count: 23 },
];

const customers: RankedRow[] = [
  { name: "Ministry of Public Health", value: 68.5, count: 6, mark: "MH" },
  { name: "Provincial Electricity Authority", value: 52.3, count: 4, mark: "PE" },
  { name: "Kasikornbank", value: 48.7, count: 5, mark: "KB" },
  { name: "CP ALL", value: 37.6, count: 4, mark: "CP" },
  { name: "Chulalongkorn University", value: 28.9, count: 3, mark: "CU" },
];

const partners: RankedRow[] = [
  { name: "Huawei", value: 112.4, count: 18, mark: "HW" },
  { name: "Dell Technologies", value: 68.6, count: 9, mark: "DE" },
  { name: "Cisco", value: 52.1, count: 7, mark: "CS" },
  { name: "HPE", value: 45.3, count: 6, mark: "HP" },
  { name: "Microsoft", value: 38.7, count: 8, mark: "MS" },
];

const sellers: RankedRow[] = [
  { name: "Wichai", value: 86.2, count: 14, mark: "W" },
  { name: "Ekaphop", value: 68.5, count: 12, mark: "E" },
  { name: "Patsara", value: 65.4, count: 11, mark: "P" },
  { name: "Natthapong", value: 48.7, count: 9, mark: "N" },
  { name: "Siriworn", value: 36.8, count: 7, mark: "S" },
];

const recent = [
  ["29 Sep 2026", "Ramathibodi Hospital · Data Center", "24.5", "Proposal", "bg-blue-100 text-blue-700"],
  ["28 Sep 2026", "CP ALL · Network", "18.2", "Negotiation", "bg-amber-100 text-amber-700"],
  ["28 Sep 2026", "PEA · UPS Upgrade", "12.6", "Qualified", "bg-sky-100 text-sky-700"],
  ["27 Sep 2026", "Thammasat University · CCTV", "9.8", "Solution", "bg-emerald-100 text-emerald-700"],
  ["27 Sep 2026", "SCG · Cloud Solution", "8.5", "Lead", "bg-indigo-100 text-indigo-700"],
];

const productMix = [
  ["Data Center", 28, "#2478ee"],
  ["Enterprise Network", 22, "#2697ee"],
  ["Server & Storage", 18, "#20b69b"],
  ["Cyber Security", 12, "#f47a38"],
  ["UPS & Power", 10, "#9b5de5"],
  ["Cloud Solution", 8, "#94a3b8"],
  ["Other", 2, "#f4b52b"],
] as const;

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <article className={`rounded-2xl bg-white shadow-sm ring-1 ring-[#deebf5] ${className}`}>{children}</article>;
}

function MiniIcon({ children, tone }: { children: React.ReactNode; tone: string }) {
  return <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-xl font-black ${tone}`}>{children}</span>;
}

function RankTable({ title, rows, valueLabel, countLabel, viewAll }: { title: string; rows: RankedRow[]; valueLabel: string; countLabel: string; viewAll: string }) {
  return <Card className="overflow-hidden">
    <div className="flex items-center justify-between border-b border-[#eaf1f6] px-4 py-3"><h3 className="text-sm font-extrabold">{title}</h3><button className="text-[11px] font-bold text-blue-600 hover:text-blue-800">{viewAll} →</button></div>
    <div className="overflow-x-auto"><table className="w-full min-w-[390px] text-left text-xs"><thead className="bg-[#f4f8fc] text-[#728da5]"><tr><th className="px-3 py-2">#</th><th className="px-2 py-2">{title.replace(/^Top 5 /, "")}</th><th className="px-2 py-2 text-right">{valueLabel}</th><th className="px-3 py-2 text-right">{countLabel}</th></tr></thead><tbody>{rows.map((row,index)=><tr key={row.name} className="border-t border-[#edf3f7]"><td className="px-3 py-2.5 font-bold text-blue-600">{index+1}</td><td className="px-2 py-2.5"><div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-full bg-blue-50 text-[9px] font-black text-blue-700">{row.mark}</span><b className="line-clamp-1">{row.name}</b></div></td><td className="px-2 py-2.5 text-right font-bold">{row.value.toFixed(1)}</td><td className="px-3 py-2.5 text-right font-bold text-[#52728e]">{row.count}</td></tr>)}</tbody></table></div>
  </Card>;
}

export function ReportsPage() {
  const { language } = useLanguage();
  const thai = language === "th";
  const [period, setPeriod] = useState("sep");
  const [team, setTeam] = useState("all");
  const [product, setProduct] = useState("all");
  const [status, setStatus] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);

  const t = thai ? {
    title:"รายงาน", subtitle:"ภาพรวมผลการดำเนินงานทีมขาย Enterprise", period:"ช่วงเวลา", team:"ทุกทีมขาย", product:"ทุกกลุ่มสินค้า", status:"ทุกสถานะ", filters:"ตัวกรองเพิ่มเติม", clear:"ล้างตัวกรอง", pipeline:"มูลค่าโอกาสทั้งหมด", weighted:"มูลค่าคาดว่าจะปิด", opportunities:"จำนวนโอกาส", keyAccounts:"จำนวนลูกค้า / Key Accounts", winRate:"อัตราการปิดการขาย", versus:"เทียบกับเดือนก่อน", pipelineStage:"มูลค่าท่อการขายตาม Stage", stage:"Stage", count:"จำนวน", value:"มูลค่า", monthly:"มูลค่าการขายรายเดือน", pipelineValue:"มูลค่าโอกาส", weightedValue:"มูลค่าคาดว่าจะปิด", opportunityCount:"จำนวนโอกาส", productShare:"สัดส่วนตามกลุ่มสินค้า", topCustomers:"Top 5 ลูกค้า (ตามมูลค่าโอกาส)", topPartners:"Top 5 Key Partners (ตามมูลค่าโอกาส)", teamPerformance:"ผลงานทีมขาย (มูลค่าโอกาส)", latest:"สถานะโอกาสล่าสุด", viewAll:"ดูทั้งหมด", customer:"ลูกค้า", partner:"Key Partner", seller:"พนักงาน", million:"ล้านบาท", items:"รายการ", date:"วันที่", customerOpportunity:"ลูกค้า / โอกาส", state:"สถานะ", conversion:"การแปลง Lead → Opportunity → Won", leadOpp:"Lead → Opportunity", oppProposal:"Opportunity → Proposal", proposalWon:"Proposal → Won", duration:"ระยะเวลาเฉลี่ยของแต่ละ Stage (วัน)", customerType:"มูลค่าการขายแยกตามประเภทลูกค้า", government:"ภาครัฐ", enterprise:"เอกชนขนาดใหญ่", soe:"รัฐวิสาหกิจ", education:"การศึกษา" 
  } : {
    title:"Reports", subtitle:"Enterprise sales performance overview", period:"Date range", team:"All sales teams", product:"All product groups", status:"All statuses", filters:"Advanced filters", clear:"Clear filters", pipeline:"Total pipeline value", weighted:"Weighted pipeline", opportunities:"Opportunities", keyAccounts:"Customers / Key Accounts", winRate:"Win rate", versus:"vs previous month", pipelineStage:"Pipeline value by stage", stage:"Stage", count:"Count", value:"Value", monthly:"Monthly sales performance", pipelineValue:"Pipeline value", weightedValue:"Weighted value", opportunityCount:"Opportunity count", productShare:"Product-group share", topCustomers:"Top 5 customers by opportunity value", topPartners:"Top 5 Key Partners by opportunity value", teamPerformance:"Sales-team performance", latest:"Latest opportunity status", viewAll:"View all", customer:"Customer", partner:"Key Partner", seller:"Sales owner", million:"THB M", items:"Items", date:"Date", customerOpportunity:"Customer / opportunity", state:"Status", conversion:"Lead → Opportunity → Won conversion", leadOpp:"Lead → Opportunity", oppProposal:"Opportunity → Proposal", proposalWon:"Proposal → Won", duration:"Average stage duration (days)", customerType:"Sales value by customer type", government:"Government", enterprise:"Large enterprise", soe:"State enterprise", education:"Education"
  };

  const factor = useMemo(() => {
    let next = period === "q3" ? .92 : period === "year" ? 1.18 : 1;
    if (team !== "all") next *= .64;
    if (product !== "all") next *= .58;
    if (status !== "all") next *= .72;
    return next;
  }, [period, product, status, team]);
  const metric = (value:number, digits=1) => (value*factor).toFixed(digits);
  const hasFilters = team !== "all" || product !== "all" || status !== "all" || period !== "sep";
  const clear = () => { setPeriod("sep"); setTeam("all"); setProduct("all"); setStatus("all"); };
  const linePoints = months.map((month,index)=>`${28+index*54},${157-month.count*4.5}`).join(" ");

  const kpis = [
    ["▦",t.pipeline,metric(356.8),t.million,"↑ 18%","bg-blue-50 text-blue-600"],
    ["◆",t.weighted,metric(168.4),t.million,"↑ 24%","bg-amber-50 text-amber-600"],
    ["▤",t.opportunities,metric(72,0),t.items,"↑ 12%","bg-sky-50 text-sky-600"],
    ["♢",t.keyAccounts,metric(48,0),"","↑ 9%","bg-rose-50 text-rose-600"],
    ["◎",t.winRate,`${Math.round(28*(factor > 1 ? 1.06 : factor < 1 ? .94 : 1))}%`,"","↑ 6%","bg-orange-50 text-orange-600"],
  ];

  return <div className="space-y-4">
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex items-center gap-4"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-violet-100 text-3xl font-black text-violet-600">▨</span><div><h1 className="text-3xl font-extrabold tracking-tight">{t.title}</h1><p className="mt-1 text-[#557795]">{t.subtitle}</p></div></div>
      <div className="flex flex-wrap gap-2">
        <select aria-label={t.period} value={period} onChange={event=>setPeriod(event.target.value)} className="rounded-xl border border-[#d8e6f1] bg-white px-3 py-2.5 text-sm font-semibold text-[#294865] shadow-sm"><option value="sep">1 Sep 2026 - 30 Sep 2026</option><option value="q3">Q3 2026</option><option value="year">Year 2026</option></select>
        <select aria-label={t.team} value={team} onChange={event=>setTeam(event.target.value)} className="rounded-xl border border-[#d8e6f1] bg-white px-3 py-2.5 text-sm font-semibold text-[#294865] shadow-sm"><option value="all">{t.team}</option><option value="enterprise">Enterprise Team</option><option value="public">Public Sector Team</option></select>
        <select aria-label={t.product} value={product} onChange={event=>setProduct(event.target.value)} className="rounded-xl border border-[#d8e6f1] bg-white px-3 py-2.5 text-sm font-semibold text-[#294865] shadow-sm"><option value="all">{t.product}</option><option value="dc">Data Center</option><option value="network">Enterprise Network</option><option value="security">Cyber Security</option></select>
        <select aria-label={t.status} value={status} onChange={event=>setStatus(event.target.value)} className="rounded-xl border border-[#d8e6f1] bg-white px-3 py-2.5 text-sm font-semibold text-[#294865] shadow-sm"><option value="all">{t.status}</option><option value="open">Open</option><option value="won">Won</option><option value="pending">Pending</option></select>
        <button onClick={()=>setFilterOpen(value=>!value)} className={`rounded-xl px-4 py-2.5 text-sm font-bold shadow-sm ${filterOpen?"bg-[#073b78] text-white":"bg-[#087bf3] text-white"}`}>▽ {t.filters}</button>
      </div>
    </header>

    {filterOpen && <Card className="flex flex-wrap items-center gap-3 p-4"><span className="text-sm font-bold text-[#52728e]">{thai?"ตัวกรองที่ใช้งาน":"Active filters"}</span>{hasFilters?<><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{period.toUpperCase()}</span>{team!=="all"&&<span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{team}</span>}{product!=="all"&&<span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{product}</span>}{status!=="all"&&<span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{status}</span>}<button onClick={clear} className="ml-auto rounded-lg border border-red-200 px-3 py-1.5 text-xs font-bold text-red-600">{t.clear}</button></>:<span className="text-xs text-[#7892aa]">{thai?"ยังไม่มีตัวกรองเพิ่มเติม":"No additional filters selected"}</span>}</Card>}

    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{kpis.map(([icon,label,value,unit,note,tone])=><Card key={label} className="p-4"><div className="flex items-start gap-3"><MiniIcon tone={tone}>{icon}</MiniIcon><div className="min-w-0"><p className="truncate text-xs font-semibold text-[#69869e]">{label}</p><div className="mt-1 flex items-end gap-1"><strong className="text-2xl font-extrabold tracking-tight">{value}</strong><span className="pb-1 text-[10px] text-[#69869e]">{unit}</span></div></div></div><div className="mt-2 flex items-center justify-between text-[10px]"><b className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-600">{note}</b><span className="text-[#7791a8]">{t.versus}</span></div></Card>)}</section>

    <section className="grid gap-4 xl:grid-cols-[1.05fr_1.5fr_.82fr]">
      <Card className="p-4"><h2 className="text-sm font-extrabold">▥ {t.pipelineStage}</h2><div className="mt-4 grid grid-cols-[.75fr_1.25fr] gap-4"><div className="space-y-1.5 pt-1">{stages.map((stage,index)=><div key={stage.name} className="mx-auto h-8 rounded-md" style={{background:stage.color,width:`${100-index*10}%`,clipPath:"polygon(4% 0,96% 0,88% 100%,12% 100%)"}} />)}</div><div><div className="grid grid-cols-[1fr_42px_55px] rounded-lg bg-[#f3f8fc] px-2 py-2 text-[10px] font-bold text-[#69869e]"><span>{t.stage}</span><span className="text-right">{t.count}</span><span className="text-right">{t.value}</span></div>{stages.map((stage,index)=><div key={stage.name} className="grid grid-cols-[1fr_42px_55px] border-b border-[#edf3f7] px-2 py-2 text-[10px]"><span className="truncate font-bold"><i className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{background:stage.color}}/>{index+1}. {stage.name}</span><b className="text-right">{Math.max(1,Math.round(stage.count*factor))}</b><b className="text-right text-blue-800">{metric(stage.value)}</b></div>)}</div></div></Card>

      <Card className="p-4"><div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-sm font-extrabold">▤ {t.monthly}</h2><div className="flex gap-3 text-[9px] font-semibold text-[#66839d]"><span><i className="mr-1 inline-block h-2 w-2 rounded-sm bg-blue-600"/>{t.pipelineValue}</span><span><i className="mr-1 inline-block h-2 w-2 rounded-sm bg-sky-300"/>{t.weightedValue}</span><span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-500"/>{t.opportunityCount}</span></div></div><div className="relative mt-5 h-52 border-b border-l border-[#dce8f2]"><div className="absolute inset-0 flex items-end justify-around gap-1 px-2">{months.map(month=><div key={month.label} className="flex h-full flex-1 items-end justify-center gap-1"><div className="w-[30%] max-w-6 rounded-t bg-gradient-to-t from-blue-700 to-blue-400" style={{height:`${month.pipeline*.82}%`}}/><div className="w-[30%] max-w-6 rounded-t bg-sky-200" style={{height:`${month.weighted*.9}%`}}/></div>)}</div><svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 500 180" preserveAspectRatio="none"><polyline points={linePoints} fill="none" stroke="#13aa76" strokeWidth="3"/><g>{months.map((month,index)=><circle key={month.label} cx={28+index*54} cy={157-month.count*4.5} r="4" fill="white" stroke="#13aa76" strokeWidth="3"/>)}</g></svg></div><div className="mt-2 grid grid-cols-9 text-center text-[9px] font-bold text-[#7892aa]">{months.map(month=><span key={month.label}>{month.label}</span>)}</div></Card>

      <Card className="p-4"><h2 className="text-sm font-extrabold">{t.productShare}</h2><div className="mt-5 flex items-center gap-4"><div className="grid h-36 w-36 shrink-0 place-items-center rounded-full" style={{background:"conic-gradient(#2478ee 0 28%,#2697ee 28% 50%,#20b69b 50% 68%,#f47a38 68% 80%,#9b5de5 80% 90%,#94a3b8 90% 98%,#f4b52b 98% 100%)"}}><div className="grid h-20 w-20 place-items-center rounded-full bg-white text-center"><div><b className="text-xl">{metric(356.8)}</b><span className="block text-[9px] text-[#66839d]">{t.million}</span></div></div></div><div className="min-w-0 flex-1 space-y-2">{productMix.map(([name,share,color])=><div className="flex items-center gap-2 text-[10px]" key={name}><i className="h-2 w-2 shrink-0 rounded-full" style={{background:color}}/><span className="truncate">{name}</span><b className="ml-auto">{share}%</b></div>)}</div></div></Card>
    </section>

    <section className="grid gap-4 xl:grid-cols-4"><RankTable title={t.topCustomers} rows={customers} valueLabel={t.million} countLabel={t.count} viewAll={t.viewAll}/><RankTable title={t.topPartners} rows={partners} valueLabel={t.million} countLabel={t.count} viewAll={t.viewAll}/><RankTable title={t.teamPerformance} rows={sellers} valueLabel={t.million} countLabel={t.count} viewAll={t.viewAll}/><Card className="overflow-hidden"><div className="flex items-center justify-between border-b border-[#eaf1f6] px-4 py-3"><h3 className="text-sm font-extrabold">{t.latest}</h3><button className="text-[11px] font-bold text-blue-600">{t.viewAll} →</button></div><div className="p-3"><div className="grid grid-cols-[72px_1fr_42px_72px] gap-2 rounded-lg bg-[#f4f8fc] px-2 py-2 text-[9px] font-bold text-[#728da5]"><span>{t.date}</span><span>{t.customerOpportunity}</span><span className="text-right">{t.value}</span><span className="text-right">{t.state}</span></div>{recent.map(row=><div key={row[1]} className="grid grid-cols-[72px_1fr_42px_72px] items-center gap-2 border-b border-[#edf3f7] px-2 py-2 text-[9px]"><span className="text-[#69869e]">{row[0]}</span><b className="truncate">{row[1]}</b><b className="text-right">{row[2]}</b><span className={`rounded-md px-1.5 py-1 text-center font-bold ${row[4]}`}>{row[3]}</span></div>)}</div></Card></section>

    <section className="grid gap-4 xl:grid-cols-[1.05fr_1.25fr_1fr]">
      <Card className="p-4"><h3 className="text-sm font-extrabold">{t.conversion}</h3><div className="mt-5 space-y-4">{[[t.leadOpp,72,"52 / 72","bg-blue-500"],[t.oppProposal,64,"46 / 72","bg-teal-500"],[t.proposalWon,28,"20 / 72","bg-violet-500"]].map(([label,percent,count,color])=><div key={label as string} className="grid grid-cols-[135px_1fr_70px] items-center gap-3 text-xs"><span className="font-semibold text-[#496b88]">{label}</span><div className="h-3 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${color}`} style={{width:`${percent}%`}}/></div><b className="text-right">{percent}% <small className="text-[#7892aa]">({count})</small></b></div>)}</div></Card>
      <Card className="p-4"><h3 className="text-sm font-extrabold">{t.duration}</h3><div className="relative mt-7 flex items-start justify-between before:absolute before:left-[8%] before:right-[8%] before:top-4 before:h-1 before:rounded-full before:bg-[#dce9f4]">{[["Lead",12,"bg-blue-500"],["Qualified",18,"bg-sky-500"],["Solution",26,"bg-emerald-500"],["Negotiation",24,"bg-amber-500"],["Closing",16,"bg-orange-500"]].map(([label,days,color])=><div className="relative z-10 w-1/5 text-center" key={label as string}><span className={`mx-auto block h-8 w-8 rounded-full border-[7px] border-white shadow ${color}`}/><b className="mt-2 block text-sm">{days}</b><span className="text-[10px] text-[#66839d]">{label}</span></div>)}</div></Card>
      <Card className="p-4"><div className="flex items-center justify-between"><h3 className="text-sm font-extrabold">{t.customerType}</h3><button className="text-[11px] font-bold text-blue-600">{t.viewAll} →</button></div><div className="mt-5 space-y-3">{[[t.government,42,150.3,"bg-blue-500"],[t.enterprise,36,128.5,"bg-teal-500"],[t.soe,14,50.2,"bg-violet-500"],[t.education,8,27.8,"bg-amber-500"]].map(([label,share,value,color])=><div key={label as string} className="grid grid-cols-[125px_1fr_86px] items-center gap-2 text-[10px]"><span className="truncate font-semibold">{label}</span><div className="h-3 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${color}`} style={{width:`${share}%`}}/></div><b className="text-right">{share}% <span className="font-normal text-[#7892aa]">{value}M</span></b></div>)}</div></Card>
    </section>
    <p className="text-center text-[10px] text-[#8298ac]">{thai?"ข้อมูลทั้งหมดในหน้านี้เป็นข้อมูลตัวอย่างเพื่อการออกแบบระบบ":"All data on this page is sample data for system design."}</p>
  </div>;
}
