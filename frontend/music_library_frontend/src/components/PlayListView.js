import DisplayCard from "./common/Card";

const PlayListView = ({ cardsData }) => {
  return (
    <div className="">
      <div className="">
        <DisplayCard
          title={cardsData.playlistName}
          description={cardsData.description}
          imageurl={cardsData.thumbnail}
          id={cardsData._id}
        />
      </div>
    </div>
  );
};
export default PlayListView;
