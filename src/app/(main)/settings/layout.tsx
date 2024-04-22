interface IProps {
  children: React.ReactNode;
}
export default function layout({ children }: IProps) {
  return (
    <div className="px-6 py-4 flex gap-6">
      <section className="bg-white bg-border rounded-md p-4 h-fit min-w-[292px]">
        <h1 className="font-bold text-2xl">Settings</h1>
        <div className="mt-8 flex flex-col gap-2 p-4 ">
          <button className="text-xl text-left w-fit">Edit profile</button>
          <button className="text-xl text-left w-fit">Change password</button>
        </div>
      </section>
      <section className="bg-white px-8 py-4 bg-border rounded-md w-full">
        {children}
      </section>
    </div>
  );
}
