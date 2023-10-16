const DisplayCard = ({ imageurl, title, description }) => {
  return (
    <div className="w-60 h-60 p-4 rounded-lg bg-gray-800 hover:bg-slate-600 flex flex-col items-center">
      <div className="pb-4 pt-2 w-full">
        <img
          className="object-scale-down"
          src={imageurl}
          alt="song logo"
        />
        <div className="flex flex-col items-center justify-center">
          <div className="font-semibold py-3">{title}</div>
          <div className="text-sm">{description}</div>
        </div>
      </div>
    </div>
  );
};
export default DisplayCard;
