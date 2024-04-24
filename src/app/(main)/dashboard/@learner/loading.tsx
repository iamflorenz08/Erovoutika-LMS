export default function loading() {
  return (
    <div className="flex flex-col px-6 py-4 h-full gap-6">
      <div className="flex flex-col xl:flex-row w-full gap-6">
        <div className="flex flex-col w-full bg-gray bg-opacity-10 animate-pulse p-4 rounded-lg border border-gray border-opacity-20 h-[552px]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-4 gap-6 mt-4 h-full overflow-auto"></div>
        </div>

        <div className="flex flex-col gap-6 w-full max-w-[432px]">
          <div className="bg-gray bg-opacity-10 animate-pulse flex flex-col gap-2 p-4 items-center justify-center rounded-lg border border-gray border-opacity-20 h-[128px]"></div>
          <div className="flex flex-col h-[400px] bg-gray bg-opacity-10 animate-pulse rounded-lg border border-gray border-opacity-20">
            <div className="flex flex-col gap-4 h-full overflow-auto"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse xl:flex-row w-full gap-6">
        <div className="w-full">
          <div className="flex flex-col h-[345px] bg-gray bg-opacity-10 animate-pulse rounded-lg  px-[28px] py-[20px]"></div>
        </div>
        <div className="flex">
          <div className="flex flex-col w-[432px] h-[345px] bg-gray bg-opacity-10 animate-pulse rounded-lg  py-[22px] px-[28px]"></div>
        </div>
      </div>
    </div>
  );
}
