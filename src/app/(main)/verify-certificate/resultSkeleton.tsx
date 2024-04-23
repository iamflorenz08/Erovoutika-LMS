export default function ResultSkeleton() {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <span className="w-24 h-24 p-3 text-gray">
          <div className="w-full h-full animate-pulse bg-skeleton rounded-full"></div>
        </span>

        <span className="bg-skeleton text-xl font-medium rounded-full w-32 h-3"></span>
      </div>
    </>
  );
}
