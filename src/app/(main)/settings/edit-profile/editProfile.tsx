"use client";
import FloatingLabelInput from "@/components/FloatingLabelInput";
import ChangePicture from "./changePicture";
import { IUser } from "@/types/userTypes";
import { useState } from "react";
import { updateProfile } from "./action";
import { useSession } from "next-auth/react";

interface IProps {
  user: IUser;
}
export default function EditProfile({ user }: IProps) {
  const { update } = useSession();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [editableUser, setEditableUser] = useState<IUser>({
    profileImage: user.profileImage,
    fullName: {
      first: user.fullName?.first ?? "",
      last: user.fullName?.last ?? "",
    },
  });

  const handleUpdateProfile = async () => {
    setIsSaving(true);
    await updateProfile(editableUser);
    setIsSaving(false);
  };
  return (
    <>
      <h1 className="font-semibold text-xl">Edit Profile</h1>
      <div className="p-4 bg-border mt-4">
        <div>
          <h2 className="font-semibold">Profile Image</h2>
          <div className="mt-2">
            <ChangePicture
              profileImageSrc={editableUser.profileImage}
              onImageChange={(url) =>
                setEditableUser({ ...editableUser, profileImage: url })
              }
            />
          </div>

          <div className="flex flex-col gap-6 w-[448px] mt-4">
            <FloatingLabelInput
              id="firstName"
              label="First name"
              type="text"
              value={editableUser.fullName?.first}
              onChange={(value) =>
                setEditableUser({
                  ...editableUser,
                  fullName: { ...editableUser.fullName, first: value },
                })
              }
            />
            <FloatingLabelInput
              id="lastName"
              label="Last name"
              type="text"
              value={editableUser.fullName?.last}
              onChange={(value) =>
                setEditableUser({
                  ...editableUser,
                  fullName: { ...editableUser.fullName, last: value },
                })
              }
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleUpdateProfile}
        className="bg-primary text-white px-4 py-2 font-semibold rounded-md mt-6"
      >
        {isSaving ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          "Save changes"
        )}
      </button>
    </>
  );
}
