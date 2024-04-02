import { useState,useEffect } from "react";
import PlayListView from "../components/PlayListView";
import LoggedInWrapper from "../containers/LoggedInWrapper";
import { authenticatedGetReq } from "../Utils/ServerHelpers";


const HomeComponent = () => {
  const [playlistData,setPlaylistData]=useState([])

  useEffect(() => {

    let items = [];
    async function fetchData() {
      items = await authenticatedGetReq("/playlist/get/all/playlists");   //it should wait for data and then setData
      setPlaylistData(items);
      // (1) you chould console.log() the items array here instead
      // if the data is properly returned from getAllItems() it will be visible here
    }
    fetchData();
  }, []);
  return (
    <LoggedInWrapper activeScreen={"home"} >
      <div className="w-full h-full">
      <div className="text-2xl font-bold mb-5">PLaylists</div>
      <div className=" flex max-lg:flex-wrap gap-3 items-center justify-center">
      {playlistData.map((item) => {
          return <PlayListView  cardsData={item} key={JSON.stringify(item)}/>
         })}
      </div>
      </div>
    </LoggedInWrapper>
  );
};
export default HomeComponent;
