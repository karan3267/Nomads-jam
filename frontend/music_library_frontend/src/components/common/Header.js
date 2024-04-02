import { Link, redirect } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import IconText from "./IconText";
import { Icon } from "@iconify/react";
import { authenticatedGetReq } from "../../Utils/ServerHelpers";

const Header = ({ activeScreen }) => {
  var tf = activeScreen === "library";
  const [cookie,setCookie,removeCookie] = useCookies(["token"]);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isCreatePlaylistModalIsOpen, setIsCreatePlaylistModalIsOpen] =
    useState(false);
  const [userData, setUserData] = useState();
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const handleLogout = () => {
    console.log(removeCookie('token'));
    
  };

  useEffect(() => {
    async function fetchData() {
      let getUserData = await authenticatedGetReq("/user/user");
      setUserData(getUserData.user.firstName[0]);
    }
    fetchData();
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  if (Object.hasOwn(cookie,'token')) {
    return (
      <div className="w-full h-full flex items-center rounded-l space-x-4 bg-gray-800 justify-end">
        {console.log(Object.keys(cookie).length===0)}
        <div className="w-full flex items-start ">
          <div className="sm:hidden flex items-center justify-center">
            <div
              onClick={toggleNav}
              className="px-4 py-2 cursor-pointer text-white hover:text-gray-300"
            >
              <Icon icon="carbon:menu" fontSize={24} />
            </div>
            {isNavOpen && (
              <div className="bg-slate-700 mt-40 z-10 rounded-md pb-3">
                <IconText
                  icon={"material-symbols:home"}
                  displayText={"Home"}
                  active={activeScreen === "home"}
                  route={"/home"}
                />
                <IconText
                  icon={"material-symbols:search"}
                  displayText={"Search"}
                  route={"/search"}
                  active={activeScreen === "search"}
                />
                <IconText
                  icon={"fluent:library-16-filled"}
                  displayText={"Library"}
                  route={"/library"}
                  active={activeScreen === "library"}
                />
                <IconText
                  icon={"ri:folder-music-line"}
                  displayText={"MySongs"}
                  route={"/mysongs"}
                  active={activeScreen === "mySongs"}
                />
                <IconText
                  icon="ant-design:file-add-outlined"
                  displayText={"Create playlist"}
                  onClick={() => {
                    setIsCreatePlaylistModalIsOpen(true);
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-1/3 justify-end flex items-center text-black mr-3 h-full">
          {tf && (
            <div className=" text-gray-400 hover:text-white rounded-full text-sm px-3">
              <Link to="/createplaylist">Create pLaylist</Link>
            </div>
          )}
          {!tf && (
            <div className="text-gray-400 hover:text-white rounded-full text-sm px-3">
              <Link to="/uploadsongs">Upload Song</Link>
            </div>
          )}
          <div className="border border-solid border-gray-300 mx-3 h-1/2"></div>
          <div
            className="bg-white font-semibold hover:bg-green-400 py-2 rounded-full px-4 hover:cursor-pointer profile"
            onClick={() => setIsDropDownOpen(!isDropdownOpen)}
          >
            {userData}
          </div>
          <div
            className={`bg-white hover:bg-green-400 py-2 rounded-sm px-4 hover:cursor-pointer profile absolute top-10 right-0 z-10 ${
              isDropdownOpen ? "block" : "hidden"
            }`}
          >
            <ul className="list-none py-1">
              <li className="text-gray-700 hover:text-black px-2 py-1">
                <button onClick={() => handleLogout()}>Logout</button>
              </li>
            </ul>
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
