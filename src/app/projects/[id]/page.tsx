import { ProjectDetailPage } from "@/components/ItemPages/ProjectDetailPage";

export default function Page({ params }: any) {
  return (
    <div className="p-8">
      <ProjectDetailPage id={+params.id} />
    </div>
  );
}