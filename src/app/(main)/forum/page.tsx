import Feed from "./feed";
import SortAndFilter from "./sortAndFilter";
import WatchedThreads from "./watchedThreads";

const Forum = () => {
  return (
    <main>
      <div className="flex justify-between gap-6 px-6">
        {/* SORT AND FILTER */}
        <SortAndFilter />

        {/* POST AND THREADS */}
        <Feed />

        {/* WATCHED THREADS */}
        <WatchedThreads />
      </div>
    </main>
  );
};

export default Forum;
