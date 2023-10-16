import { useContext } from "react";
import songContext from "../../contexts/SongContext";



const SongCard = ({ info}) => {
  const {currentSong,setCurrentSong}=useContext(songContext)
  return (
    <div
      className="flex p-2 hover:bg-gray-700 hover:bg-opacity-30 rounded-lg w-full "
      onClick={() => setCurrentSong(info)}
    >
      <div
        className="h-16 w-16 bg-cover bg-center "
        style={{
          backgroundImage: `url(${info.thumbnail})`,
        }}
      ></div>
      <div className="w-full flex">
        <div className="w-5/6 flex flex-col justify-center pl-3 w-full">
          <div className="">{info.name}</div>
          <div className=" text-sm text-gray-500">{info.artist.firstName+" "+info.artist.lastName}</div>
        </div>
        <div className="w-1/6 text-xs text-gray-500 flex justify-center items-center">
          <div>duration</div>
          <div className="h-1/3 pl-2">...</div>
        </div>
      </div>
    </div>
  );
};
export default SongCard;
