"use client";
import { storage } from "@/utils/firebaseStorage";
import { FiUpload } from "@react-icons/all-files/fi/FiUpload";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { FaRegFilePdf } from "@react-icons/all-files/fa6/FaRegFilePdf";
import { IFile } from "@/types/course";
import Image from "next/image";

interface IProps {
  value?: IFile | null;
  onChange?: (file: IFile | null) => void;
}
export default function Media({ onChange, value }: IProps) {
  const [fileInfo, setFileInfo] = useState<IFile | null>(value ?? null);
  const [uploadPercent, setUploadPercent] = useState<number>(0);

  const uploadFile = (file: File) => {
    if (!file) return;
    const storageRef = ref(
      storage,
      "contentFiles/" + file.name + "_" + Date.now()
    );
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
          const _file: IFile = {
            fileUrl: url,
            fileType: file.type,
            fileName: file.name,
          };

          setFileInfo(_file);
          onChange && onChange(_file);
        });
      }
    );
  };

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    uploadFile(file);
  }

  return (
    <>
      {fileInfo ? (
        <>
          {fileInfo.fileType?.includes("pdf") && (
            <div className="h-14 border-2 border-primary-light flex gap-4 items-center px-4 rounded-md text-primary-light mt-4">
              <FaRegFilePdf size={24} />
              <span>{fileInfo.fileName}</span>
            </div>
          )}

          {fileInfo.fileType?.includes("image") && fileInfo.fileUrl && (
            <div className="h-96 w-full mt-4 relative bg-gray bg-opacity-15">
              <Image
                className="object-contain"
                src={fileInfo.fileUrl}
                alt="file"
                fill
              />
            </div>
          )}
          <div className="flex justify-end">
            <button
              onClick={() => {
                setFileInfo(null);
                onChange && onChange(null);
              }}
              className="mt-4 w-fit text-error"
            >
              Remove
            </button>
          </div>
        </>
      ) : (
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="mt-4 h-[368px] bg-white bg-border flex flex-col items-center justify-center cursor-pointer"
        >
          <input type="file" hidden />
          <FiUpload size={48} />
          <h1 className="mt-6 text-xl font-medium">
            Select a file or drag and drop here
          </h1>
          <h2 className="mt-3 text-gray">
            JPG, PNG or PDF, file size no more than 10MB
          </h2>
          <div className="text-primary-light border border-primary-light rounded-md px-4 py-2 mt-4">
            Select file
          </div>
        </label>
      )}
    </>
  );
}
