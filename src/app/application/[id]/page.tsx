import ApplicationDetailPage from "@/components/ItemPages/ApplicationDetailPage";

type PageProps = {
  params: { id: string };
};

export default function Page({ params }: PageProps) {
  return (
    <div className="p-8">
      <ApplicationDetailPage selectedId={+params.id}/>
    </div>
  );
}