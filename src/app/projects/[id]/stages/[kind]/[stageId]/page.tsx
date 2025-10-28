import { StageDetailClientPage } from '@/features/stages/components/StageDetailClientPage';

type PageProps = {
  params: Promise<{
    id: string;
    kind: string;
    stageId: string;
  }>;
};

export default async function StagePage({ params }: PageProps) {
  const { id, stageId, kind } = await params;

  return (
    <div className="p-6">
      <StageDetailClientPage
        projectId={Number(id)}
        stageId={Number(stageId)}
        kind={decodeURIComponent(kind)}
      />
    </div>
  );
}