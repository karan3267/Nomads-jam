import { useEffect, useState} from "react"
import LoggedInWrapper from "../containers/LoggedInWrapper"
import { authenticatedGetReq } from "../Utils/ServerHelpers"
import PlayListView from "../components/PlayListView"
import CreatePlaylist from "./CreatePlaylist"

const Library=()=>{
    const [myPlaylistsData,setMyPlaylistsData]=useState([])


    useEffect(() => {
        const getData = async () => {
          const response = await authenticatedGetReq("/playlist/get/myplaylists");
          setMyPlaylistsData(response.data);
          
        };
        getData();
      }, []);
return(
    <LoggedInWrapper activeScreen="library">
      
        <div className="w-full h-full">
      <div className="text-2xl font-bold mb-5">PLaylists</div>
      <div className="flex space-x-3 h-50">
      {myPlaylistsData.map((item) => {
          return <PlayListView  cardsData={item} key={JSON.stringify(item)}/>
         })}
      </div>
      </div>
    </LoggedInWrapper>
)
}
export default Library