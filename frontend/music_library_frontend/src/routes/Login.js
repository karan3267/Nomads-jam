import { Icon } from "@iconify/react";
import TextInput from "../components/common/TextInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { unauthenticatedPostReq } from "../Utils/ServerHelpers";
const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const login = async () => {
    const data = { email, password };
    const response = await unauthenticatedPostReq("/auth/login", data);
    if (response && !response.err && !response.error) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      alert("sucess");
      navigate("/home");
    } else {
      console.log(response);
      alert("Failure");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-black text-white">
      <div className=" w-full flex justify-center">
        <Icon
          icon="ph:finn-the-human-duotone"
          className="w-20 h-20 my-3 px-2"
          color="white"
        />
        <div className="font-bold text-xl flex items-center justify-center px-3">
          Music Lib
        </div>
      </div>
      <div className="font-bold my-5">Login to continue</div>
      <div className="loginForm w-1/4 max-md:w-3/4 flex flex-col gap-2 items-center justify-center">
        <TextInput
          lable="Email or Username"
          placeholder="Email or Username"
          type="text"
          value={email}
          setValue={setEmail}
        />
        <TextInput
          lable="Password"
          placeholder="Password"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <div className=" w-full flex items-center justify-end">
          <botton
            className="bg-green-400 hover:bg-green-600 hover:text-gray-800 hover:cursor-pointer rounded-full py-2 px-4 font-semibold text-lg"
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
          >
            Login
          </botton>
        </div>
        <div className="w-full flex flex-col items-center justify-center font-semibold text-gray-400">
          Guest credentials:
          <div>Email: test@mail.com</div>
          <div>password: password</div>
        </div>
        <div className="w-full flex items-center justify-center my-2 text-lg  font-semibold">
          Dont have an Account?
        </div>
        <div className="w-1/2 py-2 border border-solid border-gray-500 flex items-center justify-center rounded-full text-gray-500 font-semibold hover:cursor-pointer hover:bg-gray-500 hover:text-white">
          <Link to="/register">SIGN UP</Link>
        </div>
      </div>
    </div>
  );
};
export default LoginComponent;
