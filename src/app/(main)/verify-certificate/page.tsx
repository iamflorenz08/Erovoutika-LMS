import { Suspense } from "react";
import Verify from "./verify";
import Result from "./result";
import ResultSkeleton from "./resultSkeleton";

interface IProps {
  searchParams: { id: string };
}

export default function page({ searchParams }: IProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <section className="bg-white bg-border rounded-md p-4 w-[956px]">
        <h1 className="text-xl">Certificate ID</h1>
        <div className="flex gap-4 mt-2">
          <Verify />
        </div>
      </section>
      {searchParams.id && (
        <section className="bg-white bg-border rounded-md p-4 w-[956px]">
          <Suspense key={searchParams.id} fallback={<ResultSkeleton />}>
            <Result certificateId={searchParams.id} />
          </Suspense>
        </section>
      )}
    </div>
  );
}
