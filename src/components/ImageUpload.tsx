import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@uploadthing/react";
import { XIcon } from "lucide-react";
import React from "react";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  endpoint: "postImage";
}

function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
  if (value) {
    return (
      <div className="relative size-28 sm:size-36">
        <img
          src={value}
          alt="Upload"
          className="rounded-md w-full h-full object-cover"
        />
        <button
          onClick={() => onChange("")}
          className="absolute top-0 right-0 p-1 bg-red-500 rounded-full shadow-sm"
          type="button"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-[120px] sm:w-[160px]">
        <UploadDropzone<OurFileRouter, "postImage">
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            if (res && res[0]?.ufsUrl) {
              onChange(res[0].ufsUrl);
            }
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
          appearance={{
            button: "text-xs sm:text-sm py-1 px-2",
            container:
              // smaller + more compact style for mobile
              "border-dashed border-2 border-gray-500/40 rounded-lg p-2 sm:p-4 bg-transparent hover:bg-gray-800/10 transition-all",
            uploadIcon: "w-8 h-8 sm:w-10 sm:h-10", // smaller upload icon
            label: "text-xs sm:text-sm", // compact label text
          }}
        />
      </div>
    </div>
  );
}

export default ImageUpload;
