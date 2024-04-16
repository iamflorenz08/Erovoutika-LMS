"use client";

interface IProps {
  title?: string;
  body?: string;
  noLabel: any;
  yesLabel: any;
  noCallback?: () => void;
  yesCallback?: () => void;
}
export default function DialogYesNo({
  title,
  body,
  noLabel,
  yesLabel,
  noCallback,
  yesCallback,
}: IProps) {
  return (
    <div className="fixed inset-0 bg-black z-50 bg-opacity-20 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 w-[404px] flex flex-col gap-6">
        <h1 className="text-center font-bold text-xl">{title}</h1>
        <span className="text-center">{body}</span>
        <div className="flex items-center gap-8 justify-end text-xl font-medium">
          <button type="button" onClick={noCallback}>
            {noLabel}
          </button>
          <button
            type="button"
            onClick={yesCallback}
            className="bg-primary text-white rounded-md flex items-center justify-center py-2 w-[148px]"
          >
            {yesLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
