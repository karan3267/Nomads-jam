import PlayListView from "../components/PlayListView";
import LoggedInWrapper from "../containers/LoggedInWrapper";

const playList1 = [
  {
    title: "Tiger ka hukum",
    imageurl:
      "https://i.cdn.newsbytesapp.com/ta/images/l38720230720174559.jpeg",
    description: "Anirudh",
  },
  {
    title: "be mine",
    imageurl:
      "https://upload.wikimedia.org/wikipedia/en/5/5a/Be_Mine_Ofenbach_Cover.jpg",
    description: "Ofenbach",
  },
  {
    title: "Tiger ka",
    imageurl:
      "https://i.cdn.newsbytesapp.com/ta/images/l38720230720174559.jpeg",
    description: "Anirudh",
  },
  {
    title: "be mine",
    imageurl:
      "https://upload.wikimedia.org/wikipedia/en/5/5a/Be_Mine_Ofenbach_Cover.jpg",
    description: "Ofenbach",
  },
  {
    title: "Tiger",
    imageurl:
      "https://i.cdn.newsbytesapp.com/ta/images/l38720230720174559.jpeg",
    description: "Anirudh",
  },
  {
    title: "be mine",
    imageurl:
      "https://upload.wikimedia.org/wikipedia/en/5/5a/Be_Mine_Ofenbach_Cover.jpg",
    description: "Ofenbach",
  },
];

const HomeComponent = () => {
  return (
    <LoggedInWrapper activeScreen={"home"}>
      <div className="w-full">
      <PlayListView titleText="Anirudh" cardsData={playList1} />
      <PlayListView titleText="Anirudh" cardsData={playList1} />
      <PlayListView titleText="Anirudh" cardsData={playList1} />
      </div>
    </LoggedInWrapper>
  );
};
// const HomeComponent = () => {
// const [isPlaying, setIsplaying] = useState(false);
// const [songPlaying, setSongPlaying] = useState(null);

// const togglePlay = () => {
//   if (!isPlaying) {
//     playMusic(
//       "https://res.cloudinary.com/dqm4juhix/video/upload/v1697017283/qdtsn8ioedteanhp869e.mp3"
//     );
//     setIsplaying(true);
//   } else {
//     pauseMusic();
//     setIsplaying(false);
//   }
// };
// const playMusic = (soundSrc) => {
//   if (songPlaying) {
//     songPlaying.stop();
//   }
//   var sound = new Howl({
//     src: [soundSrc],
//     html5: true,
//   });
//   setSongPlaying(sound);
//   sound.play();
// };
// const pauseMusic = (soundSrc) => {
//   songPlaying.pause();
// };
// return (
//   <div className="text-white w-screen h-screen overflow-auto">
//     <div className="w-full h-7/8 flex">
//       <div className="w-1/5 h-full">
//         <SideBar />
//       </div>
//       <div className="w-4/5 h-full content overflow-auto">
//         <div className="h-1/10 bg-not-black">
//           <Header />
//         </div>
//         <div className="p-8 bg-not-black">

//         </div>
//       </div>
//     </div>
//     <div className="w-full h-1/8 bg-not-black flex">
//       <div className="w-1/4 p-2 flex">
//         <img
//           src="https://images.unsplash.com/photo-1466232373731-46205f0b668e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
//           alt="song thumbnail"
//           className="h-14 w-14 object-scale-down"
//         />
//         <div className="text-gray-400 text-lg">name</div>
//       </div>
//       <div className="w-1/2 flex flex-col items-center">
//         <div className="flex w-1/3 items-center justify-between">
//           <Icon icon="fluent:previous-48-filled" fontSize={30} />
//           <Icon
//             icon={isPlaying ? "carbon:pause-filled" : "carbon:play-filled"}
//             fontSize={40}
//             onClick={togglePlay}
//           />
//           <Icon icon="fluent:next-48-filled" fontSize={30} />
//         </div>
//         <div>progress bar</div>
//       </div>
//       <div className="w-1/4 "></div>
//     </div>
//   </div>
// );
// };
export default HomeComponent;
