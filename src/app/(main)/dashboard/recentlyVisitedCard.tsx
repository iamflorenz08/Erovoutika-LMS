export default function RecentlyVisitedCard() {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <div className="w-24 h-12 bg-gray rounded-md"></div>
        <div className="flex flex-col">
          <span className="font-bold">Introduction to Laravel 8.0</span>
          <span className="font-medium text-gray">Hybrid Class</span>
        </div>
      </div>

      <div>
        <button className="bg-primary text-white px-9 py-2 rounded-md">
          View
        </button>
      </div>
    </div>
  );
}
