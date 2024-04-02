import { Icon } from "@iconify/react";
import TextInput from "../components/common/TextInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { unauthenticatedPostReq } from "../Utils/ServerHelpers";
import { useCookies } from "react-cookie";

const RegisterComponent = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const signUp = async () => {
    if (email !== confirmEmail) {
      alert("Email and confirm email fields must match, Please check again");
    }
    const data = { email, password, firstName, lastName, username };
    const response = await unauthenticatedPostReq("/auth/register", data);
    if (response && !response.err && !response.error) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      alert("sucess");
      navigate("/home");
    } else {
      alert("Failure");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-not-black text-white gap-3">
      <div className="flex justify-center">
        <Icon
          icon="ph:finn-the-human-duotone"
          className="w-20 h-20 my-3 px-2"
          color="white"
        />
        <div className="font-bold text-xl flex items-center justify-center px-3">
          Music Lib
        </div>
      </div>
      <div className="font-bold text-xl">Sign up to Start Listening</div>
      <div className="max-md:w-3/5 loginForm flex flex-col items-center justify-center gap-3">
        <TextInput
          lable="Your email id please"
          placeholder="Enter your email"
          type="text"
          value={email}
          setValue={setEmail}
        />
        <TextInput
          lable="Confirm your email"
          placeholder="Enter your email again"
          type="text"
          value={confirmEmail}
          setValue={setConfirmEmail}
        />
        <TextInput
          lable="Create a password"
          placeholder="Enter your password"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <TextInput
          lable="Your username?"
          placeholder="Enter your username"
          type="text"
          value={username}
          setValue={setUserName}
        />
        {/* <TextInput 
            lable="What's your date of birth?" 
            placeholder="Enter your DOB"
            type="text"
            className='mb-5 '
            /> */}
        <div className="flex max-md:flex-col items-center justify-center w-full gap-2">
          <TextInput
            lable="Your First name?"
            placeholder="Enter your first name"
            type="text"
            value={firstName}
            setValue={setFirstName}
          />
          <TextInput
            lable="Your last name?"
            placeholder="Enter your last name"
            type="text"
            value={lastName}
            setValue={setLastName}
          />
        </div>
        <div className="flex items-center justify-center max-md:gap-2 gap-3">
          <div className=" px-4 py-2 border border-solid border-gray-500 rounded-full text-gray-500 hover:bg-gray-500 hover:text-gray-800">
            <Link to="/login">Login Instead</Link>
          </div>
          <botton
            className="hover:bg-gray-500 hover:text-black px-4 py-2 bg-green-500 hover:bg-green-600 rounded-full font-semibold"
            onClick={(e) => {
              e.preventDefault();
              signUp();
            }}
          >
            SIGN UP
          </botton>
        </div>
      </div>
    </div>
  );
};
export default RegisterComponent;
