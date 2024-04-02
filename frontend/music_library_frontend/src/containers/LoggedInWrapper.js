import { Icon } from "@iconify/react";
import Header from "../components/common/Header";
import IconText from "../components/common/IconText";
import { useContext, useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import songContext from "../contexts/SongContext";
import { Link } from "react-router-dom";
import CreatePlaylist from "../routes/CreatePlaylist";
import "./LoggedInWrapper.css";
const LoggedInWrapper = ({ children, activeScreen }) => {
  const [isCreatePlaylistModalIsOpen, setIsCreatePlaylistModalIsOpen] =
    useState(false);
  const {
    currentSong,
    songPlaying,
    setSongPlaying,
    isPlaying,
    setIsplaying,
    volume,
    setVolume,
    progress,
    setProgress,
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

  useEffect(() => {
    if (songPlaying) {
      songPlaying.on("play", () => {
        // Start a timer to update the progress bar
        const progressInterval = setInterval(() => {
          const currentProgress =
            (songPlaying.seek() / songPlaying.duration()) * 100;
          setProgress(currentProgress);
        }, 1000); // Update every second
        return () => clearInterval(progressInterval);
      });

      songPlaying.on("end", () => {
        // Reset the progress when the audio ends
        if (progress !== 0) {
          setProgress(0);
        }
      });
    }
  }, [songPlaying, setProgress]);
  const handleProgressChange = (e) => {
    // Calculate the new position in the audio track based on the input value
    const newPosition = (e.target.value / 100) * songPlaying.duration();
    songPlaying.seek(newPosition);
    setProgress(e.target.value);
  };

  return (
    <div className="text-white w-screen h-screen bg-not-black">
      {isCreatePlaylistModalIsOpen && (
        <CreatePlaylist
          closeModal={() => setIsCreatePlaylistModalIsOpen(false)}
        />
      )}
      <div className={`${currentSong ? "h-7/8" : "h-full"} w-full flex `}>
        <div className="lg:w-1/5 h-full bg-black">
          <div className="hidden lg:block sidebar w-full h-full border-r border-gray-900 ">
            <Link to="/home">
              <div className="flex items-center justify-center font-bold">
                <Icon
                  icon="ph:finn-the-human-duotone"
                  className="w-20 h-1/10 my-3 px-2"
                  color="white"
                />
                Nomads Jam
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
                displayText={"Library"}
                route={"/library"}
                active={activeScreen === "library"}
              />
              <IconText
                icon={"ri:folder-music-line"}
                displayText={"MySongs"}
                route={"/mysongs"}
                active={activeScreen === "mySongs"}
              />
              <IconText
                icon="ant-design:file-add-outlined"
                displayText={"Create playlist"}
                onClick={() => {
                  setIsCreatePlaylistModalIsOpen(true);
                }}
              />
            </div>
          </div>
        </div>
        <div className=" w-full lg:w-4/5  h-full content  overflow-auto">
          <div className="h-1/10 ">
            <Header activeScreen={activeScreen} />
          </div>
          <div className="p-8 w-full h-9/10  overflow-auto">{children}</div>
        </div>
      </div>
      {currentSong && (
        <div className="w-full h-1/8 flex items-center">
          <div className="w-1/4 p-2 flex">
            <img
              src={currentSong.thumbnail}
              alt="song thumbnail"
              className="h-14 w-14 object-scale-down"
            />
            <div className="flex flex-col mx-3 w-2/3">
              <div className="font-semibold text-lg">{currentSong.name}</div>
              <div className="text-xs text-gray-500">
                {currentSong.artist.firstName +
                  " " +
                  currentSong.artist.lastName}
              </div>
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
            <div className="w-full flex items-center justify-center">
              <input
                className="w-1/2 hover:cursor-pointer "
                type="range"
                min="0"
                max="100"
                step="1"
                value={progress}
                onChange={handleProgressChange}
              />
            </div>
          </div>
          <div className="w-1/6 h-full flex items-center justify-end pt-5">
            <div className="flex text-2xl items-center justify-center">
              <Icon icon="tabler:volume" />
              <div className="h-1 flex items-center justify-center">
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
        </div>
      )}
    </div>
  );
};

export default LoggedInWrapper;
