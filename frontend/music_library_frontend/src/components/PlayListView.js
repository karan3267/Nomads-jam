import DisplayCard from "./common/Card";

const PlayListView = ({ titleText, cardsData }) => {
  return (
    <div className="w-full mt-7 ">
      <div className="text-2xl font-bold mb-5">{titleText}</div>
      <div className="w-full flex space-x-5 overflow-x-auto">
        {cardsData.map((item) => {
          return (
            <DisplayCard
              title={item.title}
              description={item.description}
              imageurl={item.imageurl}
            />
          );
        })}
      </div>
    </div>
  );
};
export default PlayListView;
