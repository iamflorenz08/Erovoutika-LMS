"use client";


export default function Filters() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-medium">Filter</h1>
        <button className="text-primary-light">Clear</button>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <label>
          <span className="font-medium">Format</span>
        </label>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm [--chkbg:#00008B]"
              value="selfpaced"
            />
            Self-paced
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm [--chkbg:#00008B]"
              value="live"
            />
            Live Virtual Meeting
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm [--chkbg:#00008B]"
              value="hybrid"
            />
            Hybrid
          </label>
        </div>

        <button className="bg-primary text-white py-2 rounded-md text-xl font-medium">
          Apply
        </button>
      </div>
    </>
  );
}
