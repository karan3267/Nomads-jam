import { useNavigate } from "react-router-dom";


const DisplayCard = ({ imageurl, title, description ,id}) => {
  const navigate=useNavigate();
  const handleOnClick=()=>{
    // console.log(id)
    navigate("/playlist",{state:{Id:id}})
  }
  return (
    <div className="p-4 rounded-lg bg-gray-800 hover:bg-slate-600 flex flex-col items-center" onClick={handleOnClick}>
        <div className="lg:h-40 h-20 w-32 lg:w-60">
        <img
          className="object-cover"
          src={imageurl}
          alt="song logo"
        />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="font-semibold py-3">{title}</div>
          <div className="text-xs text-gray-400 lg:h-30 h-20">{description}</div>
        </div>
      </div>

  );
};
export default DisplayCard;
