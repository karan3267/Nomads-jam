import DisplayCard from "./common/Card";

const PlayListView = ({ cardsData }) => {
  return (
    <div className="lg:w-60 w-30 mt-7">
      <div className="w-full">
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
