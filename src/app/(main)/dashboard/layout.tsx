import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

interface IProps {
  learner: React.ReactNode;
  admin: React.ReactNode;
}

export default async function layout({ learner, admin }: IProps) {
  const session = await getServerSession(authOptions);
  return (
    <>
      {session?.user.role === "learner" && learner}
      {session?.user.role === "admin" && admin}
    </>
  );
}
