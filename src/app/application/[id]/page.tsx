import ApplicationDetailPage from "@/components/ItemPages/ApplicationDetailPage";

export default function Page({ params }: any) {
  return (
    <div className="p-8">
      <ApplicationDetailPage selectedId={+params.id} />
    </div>
  );
}