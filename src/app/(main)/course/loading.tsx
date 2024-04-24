export default function loading() {
  return (
    <section className="px-6 py-4">
      <div className="p-4 bg-gray bg-opacity-10 animate-pulse rounded-lg">
        <h1 className="font-semibold text-xl h-4 w-44 bg-gray bg-opacity-40 animate-pulse rounded-full"></h1>
      </div>

      <div className="relative h-[360px] mt-4 mx-6 flex gap-4">
        <div className="p-4 bg-gray bg-opacity-10 animate-pulse  h-full rounded-lg w-full"></div>
        <div className="p-4 bg-gray bg-opacity-10 animate-pulse  h-full rounded-lg w-full"></div>
        <div className="p-4 bg-gray bg-opacity-10 animate-pulse  h-full rounded-lg w-full"></div>
        <div className="p-4 bg-gray bg-opacity-10 animate-pulse  h-full rounded-lg w-full"></div>
      </div>
    </section>
  );
}
