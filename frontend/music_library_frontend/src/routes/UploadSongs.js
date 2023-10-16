import { useState } from "react";
import ImageUpload from "../components/common/ImageUpload";
import TextInput from "../components/common/TextInput";
import { authenticatedPostReq } from "../Utils/ServerHelpers";
import { useNavigate } from "react-router-dom";
import LoggedInWrapper from "../containers/LoggedInWrapper";

const UploadSongs = () => {
  const [name,setName]=useState("")
  const [thumbnail,setThumbnail]=useState("")
  const [url,setUrl]=useState("")
  const navigate=useNavigate()

  const submitSong=async()=>{
    const data={name,thumbnail,track:url}
    const response= await authenticatedPostReq("/song/create",data)
    if(!response){
      alert("Not able to create the song")
    }else{
      
      alert("Succesfully created the song")
      navigate("/home")
    }
  }
  return (
    <LoggedInWrapper>
      <div className="w-full bg-black flex flex-col items-center justify-center">
          <div className="w-full flex justify-center text-white fomt-bold text-2xl p-4">
            Upload Your Song
          </div>
          <div className="w-2/3 space-x-4 flex">
            <TextInput
              lable="Song name"
              placeholder="Enter Song name"
              value={name}
              setValue={setName}
            />
            <div className="w-full">
              <TextInput
                lable="Thumbnail"
                placeholder="Please provide thumbnail for the song"
                value={thumbnail}
                setValue={setThumbnail}
              />
            </div>
          </div>
          <div className="pt-4">
            <ImageUpload setUrl={setUrl}/>
          </div>
          <div className="mt-5 text-black rounded-full bg-white px-3 py-2" onClick={submitSong}>
            Submit
          </div>
        </div>
    </LoggedInWrapper>
  );
};
export default UploadSongs;
