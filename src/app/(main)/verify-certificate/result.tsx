import { ICertificate } from "@/types/certificate";
import { FaRegCircleCheck } from "@react-icons/all-files/fa6/FaRegCircleCheck";
import { FaRegCircleXmark } from "@react-icons/all-files/fa6/FaRegCircleXmark";

interface IProps {
  certificateId: string;
}

const fetchCertificate = async (certificateId: string) => {
  try {
    const res = await fetch(
      `${process.env.API_URI}/api/v1/certificate/verify/${certificateId}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Server Error");
    return res.json();
  } catch (error) {
    return null;
  }
};
export default async function Result({ certificateId }: IProps) {
  const certificate: ICertificate = await fetchCertificate(certificateId);
  return (
    <>
      {certificate ? (
        <>
          <div className="flex flex-col items-center gap-4">
            <span className="text-success w-24 h-24 p-3">
              <FaRegCircleCheck size={"100%"} />
            </span>

            <span className="text-success text-xl font-medium">
              Valid Certificate ID
            </span>
          </div>

          <div className="mt-4">
            <h1 className="font-medium text-xl">Details</h1>
            <div className="flex flex-col mt-4">
              <div className="flex">
                <span className="text-gray w-[145px]">Name:</span>
                <span className="capitalize">
                  {certificate.learner?.fullName?.first}{" "}
                  {certificate.learner?.fullName?.last}
                </span>
              </div>
              <div className="flex">
                <span className="text-gray w-[145px]">Course:</span>
                <span>{certificate.course?.name}</span>
              </div>
              <div className="flex">
                <span className="text-gray w-[145px]">Instructor:</span>
                <span>N/A</span>
              </div>
              <div className="flex">
                <span className="text-gray w-[145px]">Completion Date:</span>
                <span>N/A</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center gap-4">
            <span className="text-error w-24 h-24 p-3">
              <FaRegCircleXmark size={"100%"} />
            </span>

            <span className="text-error text-xl font-medium">
              Invalid Certificate ID
            </span>
          </div>
        </>
      )}
    </>
  );
}
