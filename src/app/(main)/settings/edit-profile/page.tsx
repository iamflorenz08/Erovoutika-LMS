import FloatingLabelInput from "@/components/FloatingLabelInput";
import ChangePicture from "./changePicture";

export default function page() {
  return (
    <>
      <h1 className="font-semibold text-xl">Edit Profile</h1>
      <div className="p-4 bg-border mt-4">
        <div>
          <h2 className="font-semibold">Profile Image</h2>
          <div className="mt-2">
            <ChangePicture />
          </div>

          <div className="flex flex-col gap-6 w-[448px] mt-4">
            <FloatingLabelInput id="firstName" label="First name" type="text" />
            <FloatingLabelInput id="lastName" label="Last name" type="text" />
          </div>
        </div>
      </div>
    </>
  );
}
