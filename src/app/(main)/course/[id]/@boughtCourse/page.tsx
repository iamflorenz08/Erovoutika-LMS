import Lessons from "./lessons";

export default function page() {
  return (
    <div className="px-6 py-4">
      <div className="flex gap-6">
        <section className="bg-white w-full rounded-lg p-4 border border-gray border-opacity-20">
          <h1 className="font-semibold text-3xl">
            Introduction to Laravel 8.0
          </h1>
          <h2 className="font-semibold text-xl mt-4">Course Outline</h2>
          <div className="mt-4 flex flex-col gap-4">
            <Lessons />
            <Lessons />
          </div>
        </section>
        <section className="bg-white w-full rounded-lg p-4 h-fit border border-gray border-opacity-20">
          <h1 className="font-semibold text-xl">Course Outline</h1>
          <div className="mt-4 flex flex-col gap-4 p-4 border border-gray border-opacity-20">
            <p>Sample</p>
          </div>
        </section>
      </div>
    </div>
  );
}
