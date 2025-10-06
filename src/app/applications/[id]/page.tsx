import ApplicationDetailPage from "@/features/applications/components/ApplicationDetailPage";

export default function Page({ params }: any) {
  return (
    <div className="p-8">
      <ApplicationDetailPage id={+params.id} />
    </div>
  );
}