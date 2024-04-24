interface IProps {
  learner: React.ReactNode;
  admin: React.ReactNode;
}

const getRole = () => {
  return "learner";
};
export default function layout({ learner, admin }: IProps) {
  const role = getRole();
  return (
    <>
      {role === "learner" && learner}
      {role === "admin" && admin}
    </>
  );
}
