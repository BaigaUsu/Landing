import { TaskDetailPage } from "@/components/ItemPages/TaskDetailPage";


type PageProps = {
  params: { id: string };
};

export default function Page({ params }: PageProps) {
  return (
    <div className="p-8">
      <TaskDetailPage taskId={+params.id} />
    </div>
  );
}