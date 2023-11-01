import { useState } from "react";
import TextInput from "../components/common/TextInput";
import { authenticatedPostReq } from "../Utils/ServerHelpers";

const CreatePlaylist = ({ closeModal }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [songs, setSongs] = useState("");
  const [description, setDescription] = useState("");
  const onClickHanler = async () => {
    const data = { playlistName, thumbnail, songs, description };
    const response = await authenticatedPostReq(
      "/playlist/create/playlist",
      data
    );
    console.log(response);
    if (response.ok) {
      alert("Sucess");
    } else {
      alert("Somethig went wrong");
    }
  };
  return (
    <div
      className="absolute bg-black w-full h-full bg-opacity-40 flex items-center justify-center"
      onClick={closeModal}
    >
      <div
        className="text-gray-400 w-1/3 rounded-md p-3 bg-gray-700 flex flex-col items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="text-xl font-bold py-3"> CreatePlaylist</div>
        <div className="w-5/6 space-y-4 flex flex-col items-center justify-center">
          <TextInput
            lable="Playlist name"
            placeholder="Enter playlist name"
            type="text"
            value={playlistName}
            setValue={setPlaylistName}
          />
          <TextInput
            lable="Thumbnail"
            placeholder="Enter thumbnail url"
            type="text"
            value={thumbnail}
            setValue={setThumbnail}
          />
          <TextInput
            lable="Description"
            placeholder="Describe the characteristics of your playlist"
            type="text"
            value={description}
            setValue={setDescription}
          />
          <TextInput
            lable="Song Id"
            placeholder="Enter Song Id"
            type="text"
            value={songs}
            setValue={setSongs}
          />
          <div
            className="rounded-md bg-white py-2 px-3 hover:cursor-pointer text-gray-500"
            onClick={onClickHanler}
          >
            Create
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePlaylist;
