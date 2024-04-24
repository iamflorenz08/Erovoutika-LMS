import { Suspense } from "react";
import Feed from "./feed";
import SortAndFilter from "./sortAndFilter";
import WatchedThreads from "./watchedThreads";
import ContentModal from "./contentModal";
import Categories from "./categories";
import FeedLoading from "./feedLoading";
import WatchedThreadLoading from "./watchedThreadLoading";

interface IProps {
  searchParams: { category: string };
}

const Forum = ({ searchParams }: IProps) => {
  return (
    <main>
      <div className="flex justify-between gap-6 px-6">
        {/* SORT AND FILTER */}
        <SortAndFilter />

        {/* POST AND THREADS */}
        <div className="w-full flex flex-col gap-4">
          {/* Thread Creation */}
          <ContentModal />

          {/* Categories */}
          <Categories />

          <Suspense key={searchParams.category} fallback={<FeedLoading />}>
            <Feed category={searchParams.category} />
          </Suspense>
        </div>

        {/* WATCHED THREADS */}
        <Suspense fallback={<WatchedThreadLoading />}>
          <WatchedThreads />
        </Suspense>
      </div>
    </main>
  );
};

export default Forum;
