import { ProjectDetailPage } from "@/features/projects/components/ProjectDetailPage";

export default function Page({ params }: any) {
  return (
    <div className="p-8">
      <ProjectDetailPage id={+params.id} />
    </div>
  );
}