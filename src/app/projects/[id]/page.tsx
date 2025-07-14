import ApplicationMasterDetailPage from "@/app/application/page";
import { ProjectDetailPage } from "@/components/ItemPages/ProjectDetailPage";

type PageProps = {
  params: { id: string };
};

export default function Page({ params }: PageProps) {
  return (
    <div className="p-8">
      <ProjectDetailPage id={+params.id} />
    </div>
  );
}