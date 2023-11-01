import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginComponent from "./routes/Login";
import RegisterComponent from "./routes/Register";
import HomeComponent from "./routes/Home";
import { useCookies } from "react-cookie";
import UploadSongs from "./routes/UploadSongs";
import { useState } from "react";
import MySongs from "./routes/MySongs";
import songContext from "./contexts/SongContext";
import  Search  from "./routes/Search";
import Playlist from "./routes/Playlist";
import Library from "./routes/Library"


export default function App() {
  const [cookie] = useCookies(["token"]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsplaying] = useState(false);
  const [songPlaying, setSongPlaying] = useState(null);
  const [volume, setVolume] = useState(0.5);
  return (
    <div className="App w-screen h-screen">
      <BrowserRouter>
        {cookie.token ? (
          <songContext.Provider
            value={{
              currentSong,
              setCurrentSong,
              isPlaying,
              setIsplaying,
              songPlaying,
              setSongPlaying,
              volume,
              setVolume,
            }}
          >
            <Routes>
              <Route path="*" element={<HomeComponent />} />
              <Route path="/home" element={<HomeComponent />} />
              <Route path="/uploadsongs" element={<UploadSongs />} />
              <Route path="/mysongs" element={<MySongs />} />
              <Route path="/search" element={<Search/>}/>
              <Route path="/playlist" element={<Playlist/>}/>
              <Route path="/library" element={<Library/>}/>
            </Routes>
          </songContext.Provider>
        ) : (
          <Routes>
            <Route path="*" element={<LoginComponent />} />
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}
