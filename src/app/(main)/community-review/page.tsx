export default function page() {
  return (
    <section className="p-4 flex justify-center">
      <div className="bg-white w-[816px] bg-border p-2">
        <h1 className="px-4 py-2 font-medium text-xl">
          Flagged Comments and Posts
        </h1>
        <div className="mt-2">
          <table className="w-full">
            <thead className="border-b-2">
              <tr className="text-left">
                <th className="p-2 px-4">Report</th>
                <th className="p-2 px-4">Date Reported</th>
                <th className="p-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4">
                  <span>Steph Isidoro</span>
                </td>
                <td className="py-2 px-4">
                  <span>Learner</span>
                </td>
                <td className="py-2 px-4">
                  <span>Master (Lvl 6)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
