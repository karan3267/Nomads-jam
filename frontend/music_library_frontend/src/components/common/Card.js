import { useNavigate } from "react-router-dom";

const DisplayCard = ({ imageurl, title, description, id }) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    // console.log(id)
    navigate("/playlist", { state: { Id: id } });
  };
  return (
    <div
      className="p-4 rounded-lg bg-gray-800 hover:bg-slate-600 flex flex-col items-center"
      onClick={handleOnClick}
    >
      <div className="">
        <img
          className="object-cover h-40 w-52"
          src={imageurl}
          alt="song logo"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="font-semibold pt-3">{title}</div>
        <div className="text-xs text-gray-400 h-16 w-44 flex items-center justify-center">
          {description}
        </div>
      </div>
    </div>
  );
};
export default DisplayCard;
