"use client";
import useUpdateCourseDetails from "@/hooks/useUpdateCourseDetails";
import { storage } from "@/utils/firebaseStorage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { useState } from "react";

interface IProps {
  profileImageSrc?: string;
  onImageChange?: (url: string) => void;
}

export default function ChangePicture({
  profileImageSrc,
  onImageChange,
}: IProps) {
  const [uploadPercent, setUploadPercent] = useState<number>(100);
  const [imageSrc, setImageSrc] = useState<string | null | undefined>(
    profileImageSrc
  );

  const uploadBanner = (file: File | null | undefined) => {
    if (!file) return;
    const storageRef = ref(storage, "profiles/" + file.name + "_" + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercent(progress);
        switch (snapshot.state) {
          case "error":
            uploadTask.cancel();
            break;
          case "canceled":
            uploadTask.cancel();
            break;
        }
      },
      (erorr) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageSrc(url);
          onImageChange && onImageChange(url);
        });
      }
    );
  };

  return (
    <form className="flex flex-col gap-2 w-fit">
      <div className="relative min-w-[180px] min-h-[180px] bg-[#D9D9D9]">
        {imageSrc && (
          <Image className="object-cover" src={imageSrc} alt="banner" fill />
        )}
      </div>
      <input
        onChange={(e) => uploadBanner(e.target.files?.[0])}
        id="image"
        className="hidden"
        type="file"
        accept="image/*"
      />
      <label
        htmlFor="image"
        className="text-white bg-[#3B4045] py-2 text-center hover:bg-opacity-90 cursor-pointer duration-300"
      >
        Change Picture
      </label>
    </form>
  );
}
