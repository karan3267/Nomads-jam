import { Icon } from '@iconify/react';
import TextInput from '../components/common/TextInput';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { unauthenticatedPostReq } from '../Utils/ServerHelpers';
const LoginComponent=()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [cookie,setCookie]=useCookies(["token"])
    const navigate=useNavigate();
    const login=async()=>{
        
        const data={email,password}
        const response=await unauthenticatedPostReq("/auth/login",data)
        if(response && !response.err && !response.error){
            const token=response.token
            const date=new Date();
            date.setDate(date.getDate()+30)
            setCookie("token",token,{path:"/",expires:date})
            alert("sucess")
            navigate("/home")
        }else{
            console.log(response)
            alert("Failure")
        }
    }


return(
    <div className='w-full h-full flex flex-col items-center'>
        <div className='logo p-3 border-b border-solid border-gray-400 w-full flex justify-center'>
        <Icon icon="simple-icons:youtubemusic" width="70" height='70' color='#00ffff' />
        <div className='font-bold text-xl flex items-center justify-center text-cyan-400 px-3'>Music Lib</div>
        </div>
        <div className='font-bold my-5'>
            Login to continue
        </div>
        <div className='loginForm w-1/3 py-10 flex flex-col items-center justify-center'>
            <TextInput 
            lable="Email or Username" 
            placeholder="Email or Username"
            type="text"
            className='mb-5 '
            value={email}
            setValue={setEmail}
            />
            <TextInput 
            lable="Password" 
            placeholder="Password"
            type="password"
            className=''
            value={password}
            setValue={setPassword}
            />
            <div className=" w-full flex items-center justify-end">
            <botton className="bg-green-400 rounded-full p-3 px-5 my-5 font-semibold text-lg"
            onClick={(e)=> {e.preventDefault(); login();}}
            >Log in</botton>
            </div>
            <div className='w-full flex items-center justify-center border-t p-3 border-solid border-gray-600 text-xl fle font-semibold'>
                Dont have an Account?
            </div>
            <div className='w-full my-2 py-2 border border-solid border-gray-500 flex items-center justify-center rounded-full text-gray-500 font-semibold'>
                <Link to="/register">
                SIGN UP
                </Link>
            </div>
        </div>
    </div>
)
}
export default LoginComponent;