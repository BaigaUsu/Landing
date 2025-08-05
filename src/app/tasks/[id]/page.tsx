import { TaskDetailPage } from "@/features/task/components/TaskDetailPage";



export default function Page({ params }: any) {
  return (
    <div className="p-8">
      <TaskDetailPage taskId={+params.id} />
    </div>
  );
}