import { createContext } from "react";
const songContext = createContext({
  currentSong: null,
  setCurrentSong: (currentSong) => {},
  isPlaying: false,
  setIsplaying: () => {},
  songPlaying: null,
  setSongPlaying: () => {},
  volume: 0.5,
  setVolume: () => {},
  progress:0,
  setProgress:()=>{},
});
export default songContext;
