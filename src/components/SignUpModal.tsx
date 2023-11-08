import { experimental_useFormStatus as useFormStatus } from "react-dom"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle'
import { FaTimes } from '@react-icons/all-files/fa/FaTimes';
import { createUserEmail } from "@/app/signin/actions";

const initialState = {
  message: null,
}

const SubmitEmailButton = () => {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="absolute right-2 py-2 px-4 rounded-md border border-transparent font-semibold bg-primary hover:bg-[#000067] text-white focus:z-10 focus:outline-none focus:ring-2 transition-all text-sm top-1/2 -translate-y-1/2">
      Get Started
    </button>
  )
}

interface ISignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal = ({ isOpen, onClose }: ISignUpModalProps) => {
  const [state, formAction] = useFormState(createUserEmail, initialState)

  if (!isOpen) return

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-25">
      <div className="bg-white w-[512px] p-4 rounded-lg shadow-lg">

        <div className="grid grid-cols-3 gap-x-3 relative">
          <h2 className="text-[32px] font-bold mb-4 col-span-3 ">Create an account</h2>
          <button onClick={() => onClose()} className="text-black-500 mb-3 absolute top-0 right-0 mt-4 mr-4">
            <FaTimes style={{ fontSize: '24px' }} />
          </button>
        </div>


        <button
          className="mt-[24px] w-full rounded-lg text-[20px] py-[15px] font-semibold border text-semi-black border-gray flex justify-center items-center gap-3">
          <FcGoogle />
          Google
        </button>

        <div className="relative mt-[24px]">
          <div className="border border-gray mx-[80px]"></div>
          <label className="text-[16px] text-gray bg-white px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold">OR CONTINUE WITH</label>
        </div>


        <form action={formAction}>
          <div className="relative mt-[30px] mb-2">
            <label
              htmlFor="email"
              className={`absolute top-0 left-0 px-2 transition duration-200 translate-x-3 -translate-y-[10px] 
              bg-white ${state?.message ? 'text-red-500' : 'text-black'}`}>Email</label>

            <input
              type="text"
              id="email"
              name="email"
              className={`bg-white py-4 px-4 outline-none w-full rounded-lg rounded-bl-lg border ${state?.message ? 'border-red-500' : 'border-gray'} transition duration-200`}
              placeholder=" " />

            <SubmitEmailButton />

          </div>

          <label
            htmlFor="email"
            className={`ml-5 text-red-500 transition duration-200 ${!state?.message && 'hidden'}`}>{state?.message}</label>

        </form>


      </div>
    </div>
  );
};

export default SignUpModal;
