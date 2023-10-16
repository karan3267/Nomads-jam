import { Icon } from "@iconify/react";
import Header from "../components/common/Header";
import IconText from "../components/common/IconText";
import { useContext, useEffect, useRef } from "react";
import { Howl } from "howler";
import songContext from "../contexts/SongContext";
import { Link } from "react-router-dom";

const LoggedInWrapper = ({ children, activeScreen }) => {
  const {
    currentSong,
    setCurrentSong,
    songPlaying,
    setSongPlaying,
    isPlaying,
    setIsplaying,
    volume,
    setVolume,
  } = useContext(songContext);

  const changeSong = (soundSrc) => {
    if (songPlaying) {
      songPlaying.stop();
    }
    var sound = new Howl({
      src: [soundSrc],
      html5: true,
      volume: 0.5,
    });
    setSongPlaying(sound);
    sound.play();
    setIsplaying(true);
  };

  const firstRender = useRef(true);

  const handleChange = (e) => {
    const value = e.target.value;
    setVolume(value);
    songPlaying.volume(value);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!currentSong) {
      return;
    }
    console.log("here");
    changeSong(currentSong.track);
  }, [currentSong && currentSong.track]);

  const togglePlay = () => {
    if (!isPlaying) {
      playSong(currentSong.track);
      setIsplaying(true);
    } else {
      pauseSong();
      setIsplaying(false);
    }
  };

  const playSong = () => {
    if (!songPlaying) {
      return;
    }
    songPlaying.play();
  };
  const pauseSong = () => {
    songPlaying.pause();
  };
  return (
    <div className="text-white w-screen h-screen">
      <div className={`${currentSong ? "h-7/8" : "h-full"} w-full flex`}>
        <div className="w-1/5 h-full">
          <div className="w-full h-full border-r border-gray-900 bg-black">
            <Link to="/home">
              <div className="flex items-center justify-center font-bold ">
                <Icon
                  icon="arcticons:lark-player"
                  className="w-20 h-20 my-3 px-2"
                />
                Music Lib
              </div>
            </Link>
            <div>
              <IconText
                icon={"material-symbols:home"}
                displayText={"Home"}
                active={activeScreen === "home"}
                route={"/home"}
              />
              <IconText
                icon={"material-symbols:search"}
                displayText={"Search"}
                route={"/search"}
                active={activeScreen === "search"}
              />
              <IconText
                icon={"fluent:library-16-filled"}
                displayText={"PlayList"}
                route={"/playlist"}
                active={activeScreen === "playlist"}
              />
              <IconText
                icon={"ri:folder-music-line"}
                displayText={"MySongs"}
                route={"/mysongs"}
                active={activeScreen === "mySongs"}
              />
            </div>
          </div>
        </div>
        <div className="w-4/5 h-full content bg-not-black overflow-auto">
          <div className="h-1/10 bg-not-black">
            <Header />
          </div>
          <div className="p-8 w-full h-full bg-not-black">{children}</div>
        </div>
      </div>
      {currentSong && (
        <div className="w-full h-1/8 bg-not-black flex">
          <div className="w-1/4 p-2 flex">
            <img
              src={currentSong.thumbnail}
              alt="song thumbnail"
              className="h-14 w-14 object-scale-down"
            />
            <div className="text-gray-400 w-2/3 text-base">
              {currentSong.name}
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-center">
            <div className="flex w-1/3 items-center justify-between">
              <Icon icon="fluent:previous-48-filled" fontSize={30} />
              <Icon
                icon={isPlaying ? "carbon:pause-filled" : "carbon:play-filled"}
                fontSize={40}
                onClick={togglePlay}
              />
              <Icon icon="fluent:next-48-filled" fontSize={30} />
            </div>
            <div>progress bar</div>
          </div>
          <div className="w-1/6 h-full flex items-center justify-end pt-5">
            <div className="flex text-2xl">
              <Icon icon="tabler:volume" />
              <input 
                className="w-full hover:cursor-pointer"
                type="range"
                min="0"
                max="1"
                step=".05"
                value={volume}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default LoggedInWrapper;
