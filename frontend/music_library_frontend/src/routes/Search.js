import LoggedInWrapper from "../containers/LoggedInWrapper";
import { Icon } from "@iconify/react";
import { useState } from "react";
import SongCard from "../components/common/SongCard";
import { authenticatedGetReq } from "../Utils/ServerHelpers";

const Search = () => {
  const [isInputFocused, setInputFocused] = useState(false);
  const [inputText, setInputText] = useState("");

  const [songData, setSongData] = useState([]);
  const searchSong = async () => {
    const response = await authenticatedGetReq("/song/get/song/" + inputText);
    //   setSongData(response.data);
    setSongData(response.data);
  };

  return (
    <LoggedInWrapper>
      <div className="w-full h-full">
        <div
          className={`flex items-center p-3 rounded-full space-x-3 w-1/3 bg-gray-800 ${
            isInputFocused ? "border border-white" : ""
          }`}
        >
          <div className="text-xl">
            <Icon icon="iconamoon:search-fill" />
          </div>
          <div className="w-full">
            <input
              type="text"
              className="w-full bg-gray-800 focus:outline-none"
              placeHolder=" Type a song name here"
              onFocus={() => {
                setInputFocused(true);
              }}
              onBlur={() => {
                setInputFocused(false);
              }}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchSong();
                }
              }}
            />
          </div>
        </div>
        {songData.length <= 0 ? (
          <div className="pt-10">
            No songs found for <span className="font-bold">{inputText}</span>
          </div>
        ) : (
          <div className="space-y-2 pt-10">
            Song Results for <span className="font-bold">{inputText}</span> :
            {songData.map((item) => {
              return <SongCard info={item} key={JSON.stringify(item)} />;
            })}
          </div>
        )}
      </div>
    </LoggedInWrapper>
  );
};
export default Search;
