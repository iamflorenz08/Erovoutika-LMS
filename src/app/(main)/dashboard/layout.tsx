interface IProps {
  learner: React.ReactNode;
  admin: React.ReactNode;
}

const getRole = () => {
  return "admin";
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
