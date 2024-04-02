import { useState } from "react";
import { openUploadWidget } from "../../Utils/CloudinaryService.js";
import { uploadPreset } from "../../Utils/Config.js";

const ImageUpload = ({setUrl}) => {
  const [isUplaoded,setIsUploaded]=useState(false)
  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: "dqm4juhix",
        uploadPreset: uploadPreset,
        sources: ["local"],
      },
      function (error, result) {
        if (!error && result.event === "success") {
          setUrl(result.info.secure_url);
          setIsUploaded(true)
        } else {
          if (error) {
            console.log(error);
          }
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button className="text-black px-4 py-2 fonr-bold rounded-full bg-white hover:cursor-pointer" onClick={uploadImageWidget}>
      {(!isUplaoded)?"Upload Song":"Song Uploaded to Cloud"}
    </button>
  );
};

export default ImageUpload;
