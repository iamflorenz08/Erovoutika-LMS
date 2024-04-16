import { ICourse } from "@/types/course";
import { storage } from "@/utils/firebaseStorage";
import { IoImageSharp } from "@react-icons/all-files/io5/IoImageSharp";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { useEffect, useState } from "react";
import ModalButton from "./modalButton";

interface IProps {
  doneStep: () => void;
}

export default function CourseBannerModal({ doneStep }: IProps) {
  const [currentImage, setCurrentImage] = useState<string>("");
  const [uploadPercent, setUploadPercent] = useState<number>(100);

  const uploadBanner = (file: File | null | undefined) => {
    if (!file) return;
    const storageRef = ref(storage, "banners/" + file.name + "_" + Date.now());
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
        getDownloadURL(uploadTask.snapshot.ref).then((bannerURL) => {
          setCurrentImage(String(bannerURL));
        });
      }
    );
  };
  return (
    <div className="bg-white border border-gray border-opacity-20 p-4 rounded-lg flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Course Banner</h1>
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="flex flex-col gap-1 items-center">
          <div className="relative flex justify-center items-center w-[320px] h-[160px] bg-[#D9D9D9] md:mx-[100px] lg:mx-[232px] duration-100">
            <span className="text-gray">
              <IoImageSharp size={50} />
            </span>

            {currentImage && (
              <Image
                alt="banner"
                className="object-cover"
                src={currentImage}
                fill
              />
            )}
            {uploadPercent !== 100 && (
              <div className="absolute bottom-0 w-full bg-slate-500 h-3 ">
                <div
                  style={{
                    width: `${uploadPercent}%`,
                  }}
                  className="h-full bg-slate-600 transition-all duration-300"
                ></div>
              </div>
            )}
          </div>
          <span>1:2 image</span>
        </div>
        <input
          onChange={(e) => uploadBanner(e.target.files?.[0])}
          className="hidden"
          type="file"
          accept="image/*"
          name="banner"
          id="banner"
        />
        <label
          htmlFor="banner"
          className="py-2 px-7 bg-[#3B4045] text-white w-fit"
        >
          Choose picture
        </label>
      </div>
      <div className="flex justify-end">
        <ModalButton
          label="Next"
          onClick={() => {
            if (!currentImage) {
              //put error condition here
              return;
            }
            const course: ICourse = JSON.parse(
              localStorage.getItem("course") || "{}"
            );
            course.banner = currentImage;
            localStorage.setItem("course", JSON.stringify(course));
            doneStep();
          }}
        />
      </div>
    </div>
  );
}
