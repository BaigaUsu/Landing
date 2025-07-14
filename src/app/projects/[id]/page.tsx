import ApplicationMasterDetailPage from "@/app/application/page";
import { ProjectDetailPage } from "@/components/ItemPages/ProjectDetailPage";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <ProjectDetailPage id={+params.id} />
    </div>
  );
}