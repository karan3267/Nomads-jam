import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
const IconText = ({icon,displayText,active,route,onClick}) =>{
    
    return(
        <Link to={route}>
        <div className="flex items-center  justify-start cursor-pointer" onClick={onClick}>
            <div className="px-5 py-3">
            <Icon icon={icon} height='24' color={active?"white":"gray"}/>
            </div>
            <div className={`font-semibold text-gray-300 hover:text-gray-500 ${active?"text-white":"text-gray-300"}`}>
            {displayText}
            </div>
        </div>
        </Link>
    )
}
export default IconText;