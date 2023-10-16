import { Icon } from '@iconify/react';
import TextInput from '../components/common/TextInput';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { unauthenticatedPostReq } from '../Utils/ServerHelpers';
import { useCookies } from 'react-cookie';

const RegisterComponent=()=>{
    const [email,setEmail]=useState("")
    const [confirmEmail,setConfirmEmail]=useState("")
    const [password,setPassword]=useState("")
    const [username,setUserName]=useState("")
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [cookie,setCookie]=useCookies(["token"])
    const navigate=useNavigate();
    const signUp=async()=>{
        if(email!==confirmEmail){
            alert("Email and confirm email fields must match, Please check again")
        }
        const data={email,password,firstName,lastName,username}
        const response=await unauthenticatedPostReq("/auth/register",data)
        if(response && !response.err && !response.error){
            const token=response.token
            const date=new Date();
            date.setDate(date.getDate()+30)
            setCookie("token",token,{path:"/",expires:date})
            alert("sucess")
            navigate("/home")
        }else{
            alert("Failure")
        }
    }
    
return(
    <div className='w-full h-full flex flex-col items-center'>
        <div className='logo p-3 border-b border-solid border-gray-400 w-full flex justify-center'>
        <Icon icon="simple-icons:youtubemusic" width="70" height='70' color='#00ffff' />
        <div className='font-bold text-xl flex items-center justify-center text-cyan-400 px-3'>Music Lib</div>
        </div>
        <div className='font-bold my-5 text-xl'>
            Sign up to Start Listening
        </div>
        <div className='loginForm w-1/3 py-10 flex flex-col items-center justify-center'>
            <TextInput 
            lable="Your email id please" 
            placeholder="Enter your email"
            type="text"
            className='mb-5 '
            value={email}
            setValue={setEmail}
            />
            <TextInput 
            lable="Confirm your email" 
            placeholder="Enter your email again"
            type="text"
            className='mb-5 '
            value={confirmEmail}
            setValue={setConfirmEmail}
            />
            <TextInput 
            lable="Create a password" 
            placeholder="Enter your password"
            type="password"
            className='mb-5'
            value={password}
            setValue={setPassword}
            />
            <TextInput 
            lable="Your username?" 
            placeholder="Enter your username"
            type="text"
            className='mb-5 '
            value={username}
            setValue={setUserName}
            />
            {/* <TextInput 
            lable="What's your date of birth?" 
            placeholder="Enter your DOB"
            type="text"
            className='mb-5 '
            /> */}
            <div className="flex items-center justify-center w-full space-x-8">
                <div className='text-white fomt-bold text-xl p-4'>Upload Your Song</div>
            <TextInput 
            lable="Your First name?" 
            placeholder="Enter your first name"
            type="text"
            className='mb-5 '
            value={firstName}
            setValue={setFirstName}
            />
            <TextInput 
            lable="Your last name?" 
            placeholder="Enter your last name"
            type="text"
            className='mb-5 '
            value={lastName}
            setValue={setLastName}
            />
            </div>
            <botton className='hover:bg-gray-500 hover:text-white w-full my-2 py-2 bg-green-500 flex items-center justify-center rounded-full font-semibold'
            onClick={(e)=>{
                e.preventDefault()
                signUp();
            }
            }
            >
                SIGN UP
            </botton>
            <div className='w-full flex items-center justify-center border-t p-3 border-solid border-gray-600 text-xl fle font-semibold'>
                Already have an Account?
            </div>
            <div className='w-full my-2 py-2 border border-solid border-gray-500 flex items-center justify-center rounded-full text-gray-500 font-semibold'>
                <Link to="/login">
                Login Instead
                </Link>
            </div>
        </div>
    </div>
)
}
export default RegisterComponent;