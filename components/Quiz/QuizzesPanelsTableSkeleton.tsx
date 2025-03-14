import QuizPanelSkeleton from "./QuizPanelSkeleton";

export default function QuizzesPanelsTableSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      {Array.from({ length: 4 }).map((_, i) => {
        return <QuizPanelSkeleton key={i} />;
      })}
    </div>
  );
}
