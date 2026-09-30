import { PortalShell } from "@/components/portal-shell";
import { SectionPage } from "@/components/section-page";
import { CustomersPage } from "@/components/customers-page";
import { OpportunitiesPage } from "@/components/opportunities-page";
import { ActivitiesPage } from "@/components/activities-page";
import { ReportsPage } from "@/components/reports-page";
import { PartnersPage } from "@/components/partners-page";
import { notFound } from "next/navigation";
const sections = ["customers", "opportunities", "activities", "reports", "products", "partners", "team", "documents", "approvals", "settings"] as const;
type Section = (typeof sections)[number];
export function generateStaticParams() { return sections.map((section) => ({ section })); }
export default async function Page({ params }: { params: Promise<{ section: string }> }) { const { section } = await params; if (!sections.includes(section as Section)) notFound(); return <PortalShell active={section}>{section === "customers" ? <CustomersPage /> : section === "opportunities" ? <OpportunitiesPage /> : section === "activities" ? <ActivitiesPage /> : section === "reports" ? <ReportsPage /> : section === "partners" ? <PartnersPage /> : <SectionPage section={section as Section} />}</PortalShell>; }
