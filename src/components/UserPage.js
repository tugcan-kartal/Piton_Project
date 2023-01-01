import React,{useState} from 'react';
import Axios from 'axios';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function UserPage() {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const schema=yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(6).max(20).required(),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

    const onSubmit=async(event)=>{
        const {data}=await Axios.post('https://assignment-api.piton.com.tr/api/v1/user/login',{password,email});
        const token=data.token;  
        toast.success("User Signed Up Successfully");
        console.log(token);
    }

  return (
    <div className='bg-gray-200 py-[190px]'>

        <div className='flex flex-col lg:flex-row justify-center items-center gap-x-20'>

            <div>
                <img className='w-48 lg:w-64 rounded-full m-auto mb-8' src='https://scontent.fesb4-1.fna.fbcdn.net/v/t39.30808-6/284286842_7499232800148635_5149172578781055246_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=LTpmG10oqLoAX-CNFzH&_nc_ht=scontent.fesb4-1.fna&oh=00_AfAxWC8Rhdra4SoVauJlVcu1gSBe0Wl9X7BjU12Xkzm-Rg&oe=63B083EC'/>
                <div className='text-md lg:text-2xl font-semibold mb-4'>Technology is changing our lives at an irresistible speed.<br /> We use this change to make urban life and living easier.</div>
            </div>

            <div>
                <div className='bg-white p-4 lg:p-16 rounded-2xl shadow-xl'>
                    
                    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>


                        <input
                            className='w-[300px] h-10 rounded-md mb-4 border border-gray-500 border-1 outline-blue-600'
                            type="text"
                            name="email"
                            ref={register}
                            placeholder=" Email Address"
                            {...register("email")}
                            onChange={(event)=>{setEmail(event.target.value)}}
                        />
                        <p className='text-red-500 text-sm mb-4'> {errors.email?.message} </p>
                        
                        <input
                            className='w-[300px] h-10 rounded-md mb-4 border border-gray-500 border-1 outline-blue-600'
                            type="password"
                            name="password"
                            ref={register}
                            placeholder=" Password"
                            {...register("password")}
                            onChange={(event)=>{setPassword(event.target.value)}}
                        />
                        <p className='text-red-500 text-sm mb-4'> {errors.password?.message} </p>

                        <div className='w-100 border border-b-1 border-gray-300 mb-8'></div>

                        <input className='bg-blue-700 text-white rounded py-2 font-bold text-center mb-5' type="submit" value="Log In"/>

                        <Link to="/SignUpPage">
                            <input className='bg-green-500 text-white rounded py-2 w-[250px] font-bold text-center m-auto ml-6' type='button' value='Create New Account'/>
                        </Link>

                    </form>


                </div>  

            </div>
        </div>

        <div>
            
        </div>

    </div>
  )
}

export default UserPage