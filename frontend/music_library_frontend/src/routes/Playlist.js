import { useState,useEffect } from "react";
import LoggedInWrapper from "../containers/LoggedInWrapper";
import { authenticatedGetReq } from "../Utils/ServerHelpers";
import { useLocation } from "react-router-dom";
import SongCard from "../components/common/SongCard"

const Playlist = () => {

    // const [playlistData,setPlaylistData]=useState([]);
    const [songsData,setSongsData]=useState([])
    const location=useLocation()

    useEffect(()=>{
        // {console.log(location.state.Id)}
        let items=[]
        async function fetchData() {
            items = await authenticatedGetReq("/playlist/get/playlist/"+location.state.Id);   //it should wait for data and then setData
            // setPlaylistData(items);
            // console.log(items)
            // console.log(items.playlistData.songs)
            async function getSongsData(){
                const songsArray=await authenticatedGetReq("/song/get/songid/"+items.playlistData.songs)
                setSongsData(songsArray.data)
            }
            getSongsData()
            // (1) you chould console.log() the items array here instead
            // if the data is properly returned from getAllItems() it will be visible here
          }
          fetchData();
    },[])
  return (
    <LoggedInWrapper activeScreen="playlist">

      <div>
        {/* {console.log(songsData)} */}
        <div>
        </div>
        {songsData.map((data)=>{return <SongCard info={data} key={JSON.stringify(data)}/>})}
      </div>
    </LoggedInWrapper>
  );
};
export default Playlist;
