import React,{useState} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {AiOutlineClose} from "react-icons/ai";
import { Link } from 'react-router-dom';
import Axios from 'axios';
import toast from 'react-hot-toast';


function SignUpPage() {

    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");

    const schema=yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        phoneNumber: yup.number().positive().integer().min(10).required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).max(20).required(),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null]),        
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });

    const onSubmit=async(event)=>{
        const {data}=await Axios.post("https://assignment-api.piton.com.tr/api/v1/user/register",{name: name,password: password,email: email});
        const token=data.token;
        if (token) {
            toast.success("User Signed Up Successfully");
        } else {
            toast.error("User Signed Up Failed")
        }
    }

  return (
    <div className='bg-gray-200 h-[100vh] flex justify-center items-center'>

            <div>

                <div className='bg-white w-96 rounded-2xl shadow-xl pb-5'>

                    
                    <form className='flex flex-col justify-center items-center' onSubmit={handleSubmit(onSubmit)}>

                        <div className='flex justify-between gap-x-[250px] mt-2'>

                            <h1 className='font-bold text-lg'>Sign Up</h1>

                            <Link to="/">
                                <h1 className="text-xl text-red-600"><AiOutlineClose /></h1>
                            </Link>

                        </div>

                        <input
                            className='w-[300px] h-10 rounded-md mb-4 mt-4 border border-gray-500 border-1 outline-blue-600'
                            type="text"
                            name="firstName"
                            ref={register}
                            placeholder=" First Name"
                            {...register("firstName")}
                            onChange={(event)=>{setName(event.target.value)}}
                        />
                        <p className='text-red-500 text-sm mb-1'> {errors.firstName?.message} </p>
                        
                        <input
                            className='w-[300px] h-10 rounded-md mb-4 border border-gray-500 border-1 outline-blue-600'
                            type="text"
                            name="lastName"
                            ref={register}
                            placeholder=" Last Name"
                            {...register("lastName")}
                        />
                        <p className='text-red-500 text-sm mb-1'> {errors.lastName?.message} </p>

                        <input
                            className='w-[300px] h-10 rounded-md mb-4 border border-gray-500 border-1 outline-blue-600'
                            type="tel"
                            name="phoneNumber"
                            ref={register}
                            placeholder=" Phone Number"
                            {...register("phoneNumber")}
                        />
                        <p className='text-red-500 text-sm mb-1'> {errors.phoneNumber?.message} </p>
                        
                        <input
                            className='w-[300px] h-10 rounded-md mb-4 border border-gray-500 border-1 outline-blue-600'
                            type="text"
                            name="email"
                            ref={register}
                            placeholder=" Email Address"
                            {...register("email")}
                            onChange={(event)=>{setEmail(event.target.value)}}
                        />
                        <p className='text-red-500 text-sm mb-1'> {errors.email?.message} </p>
                        
                        <input
                            className='w-[300px] h-10 rounded-md mb-4 border border-gray-500 border-1 outline-blue-600'
                            type="password"
                            name="password"
                            ref={register}
                            placeholder=" Password"
                            {...register("password")}
                            onChange={(event)=>{setPassword(event.target.value)}}
                        />
                        <p className='text-red-500 text-sm mb-1'> {errors.email?.message} </p>
                        
                        <input
                            className='w-[300px] h-10 rounded-md mb-4 border border-gray-500 border-1 outline-blue-600'
                            type="password"
                            name="confirmPassword"
                            ref={register}
                            placeholder=" Confirm Password"
                            {...register("confirmPassword")}
                        />
                        <p className='text-red-500 text-sm'> {errors.confirmPassword?.message} </p>



                        <div className='w-5/6 border border-b-1 border-gray-300 mt-4 mb-6'></div>

                        <input className='bg-green-500 text-white rounded-lg py-2 w-[300px] font-bold text-center m-auto cursor-pointer' type='submit' value='Create New Account'/>

                    </form>

                </div>  

            </div>
       
    </div>
  )
}

export default SignUpPage