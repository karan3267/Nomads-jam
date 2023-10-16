import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const Header = () => {
  const [cookie] = useCookies(["token"]);
  if (cookie) {
    return (
      <div className="w-full h-full flex items-center rounded-l space-x-4 bg-gray-800 justify-end">
        <div className="w-1/3 justify-end flex items-center text-black mr-3 h-full">
          <div className=" text-gray-400 hover:text-white rounded-full text-sm px-3">
            <Link to="/uploadsongs">Upload Song</Link>
          </div>
          <div className="border border-solid border-gray-300 mx-3 h-1/2"></div>
          <div className="bg-white hover:bg-green-400 py-2 rounded-full px-4">
            K
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className="w-full h-full flex items-center rounded-l space-x-4 bg-gray-800 justify-end">
        <div className="mr-5 flex items-center text-black space-x-3 h-full">
          <div className="bg-white hover:bg-green-400 my-2 py-2 rounded-full px-3">
            <Link to="/register">Sign Up</Link>
          </div>
          <div className="border border-solid border-gray-300 h-1/2"></div>
          <div className="bg-white hover:bg-green-400 mr-4 py-2 rounded-full px-4">
            <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
    );
};
export default Header;
