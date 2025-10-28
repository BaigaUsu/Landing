import { TaskDetailPage } from "@/features/tasks/components/TaskDetailPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
  return (
    <div className="p-8">
      <TaskDetailPage taskId={+id} />
    </div>
  );
}