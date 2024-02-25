import { ICourse } from "@/types/course";

interface IProps {
  doneStep: () => void;
}

export default function CourseFormatModal({ doneStep }: IProps) {
  const setFormat = (format: "self-paced" | "virtual" | "hybrid") => {
    const course: ICourse = {
      format,
    };
    localStorage.setItem("course", JSON.stringify(course));
    doneStep();
  };

  return (
    <div className="bg-white border border-gray border-opacity-20 p-4 rounded-lg flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Course Format</h1>
      <div>
        <div className="flex gap-2">
          <h2 className="font-bold">Self-Paced:</h2>
          <p className="text-gray">
            Learn at your own pace with flexible scheduling.
          </p>
        </div>
        <div className="flex gap-2">
          <h2 className="font-bold">Live Virtual Meeting:</h2>
          <p className="text-gray">
            real-time sessions through online meetings.
          </p>
        </div>
        <div className="flex gap-2">
          <h2 className="font-bold">Hybrid Class:</h2>
          <p className="text-gray">
            A blend of in-person and virtual learning for a dynamic educational
            environment.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => setFormat("self-paced")}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 font-medium text-xl rounded-md min-w-[216px]"
        >
          Self-Paced
        </button>
        <button
          onClick={() => setFormat("virtual")}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 font-medium text-xl rounded-md min-w-[216px]"
        >
          Live Virtual Learning
        </button>
        <button
          onClick={() => setFormat("hybrid")}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 font-medium text-xl rounded-md min-w-[216px]"
        >
          Hybrid Class
        </button>
      </div>
    </div>
  );
}
