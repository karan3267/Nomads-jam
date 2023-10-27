import SongCard from "../components/common/SongCard";
import { authenticatedGetReq } from "../Utils/ServerHelpers";
import { useState, useEffect } from "react";
import LoggedInWrapper from "../containers/LoggedInWrapper";

const MySongs = () => {
  const [songData, setSongData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await authenticatedGetReq("/song/get/mysongs");
      setSongData(response.data);
    };
    getData();
  }, []);

  return (
    // <div className="flex w-screen h-screen">
    //   <div className="h-full text-white w-1/6">
    //     <Sidebar />
    //   </div>
    //   <div className="w-5/6 h-full bg-black">
    //     <div className="h-1/10 w-full">
    //       <Header />
    //     </div>

    //   </div>
    // </div>
    <LoggedInWrapper activeScreen={"mySongs"}>
      <div className="content p-8">
        <div className="font-bold text-whtie pl-2 pb-4">MySongs</div>
        <div className="space-y-2">
          {console.log(songData)}
          {songData.map((item) => {
            return <SongCard info={item} key={JSON.stringify(item)}/>;
          })}
        </div>
      </div>
    </LoggedInWrapper>
  );
};
export default MySongs;
