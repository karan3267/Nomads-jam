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
});
export default songContext;
