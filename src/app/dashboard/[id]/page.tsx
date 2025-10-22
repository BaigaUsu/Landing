import { DetailDashboard } from "@/features/dashboard/components/DetailDashboard";
type Mode = "worker" | "manager" | "admin";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const mode: Mode = "worker";
  
    return (
      <div className="p-8">
        <DetailDashboard workerId={+id} mode={mode} />
      </div>
    );
}