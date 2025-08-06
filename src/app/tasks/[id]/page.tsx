import { TaskDetailPage } from "@/features/tasks/components/TaskDetailPage";



export default function Page({ params }: any) {
  return (
    <div className="p-8">
      <TaskDetailPage taskId={+params.id} />
    </div>
  );
}