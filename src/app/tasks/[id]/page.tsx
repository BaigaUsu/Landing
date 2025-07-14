import { TaskDetailPage } from "@/components/ItemPages/TaskDetailPage";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <TaskDetailPage taskId={+params.id} />
    </div>
  );
}