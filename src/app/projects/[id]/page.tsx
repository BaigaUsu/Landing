import { ProjectDetailPage } from "@/features/projects/components/ProjectDetailPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
  return (
    <div className="p-8">
      <ProjectDetailPage id={+id} />
    </div>
  );
}