import React from 'react';
import {AiOutlineShopping} from "react-icons/ai";
import {IoMdArrowBack} from "react-icons/io";
import {useNavigate} from "react-router-dom";

function ProductDetails() {

  const detailsOfProduct=JSON.parse(localStorage.getItem("lastProductDetails"));

  console.log(detailsOfProduct);

  const navigate=useNavigate();

  const goBackToProductsPage=()=>{

    navigate("/ProductsPage")

  }

  return (

    <div className='bg-gray-50 pb-10 relative'>

      <div className='absolute left-5 top-5 cursor-pointer' onClick={goBackToProductsPage}><IoMdArrowBack size={30} className="text-blue-700"/></div>
      
      <h1 className='text-blue-700 font-bold text-3xl text-center pt-16 mb-10'>Product Details</h1>
      
      <div className='flex flex-col justify-center items-center bg-white sm:w-1/2 w-full m-auto shadow-lg rounded-2xl text-center gap-y-4'>

        <div> <AiOutlineShopping size={40} className="text-gray-500"/> </div>
        <h1 className='text-blue-700 text-2xl font-bold'>Name</h1>
        <div className='text-gray-400 text-md font-semibold'> {detailsOfProduct.name} </div>
        <div className=''> <img className='max-w-full h-auto' src='https://www.piton.com.tr/images/banner_image.png' /> </div>
        <div className='text-blue-700 text-2xl font-bold'>More Details</div>
        <div className='text-gray-400 text-md font-semibold pb-5'> {detailsOfProduct.description} </div>

      </div>

    </div>

  )
}

export default ProductDetails