import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import {IoMdArrowBack} from "react-icons/io";

function FavouritePage() {

    const [allProducts,setAllProducts]=useState([]);

    const lastToken=localStorage.getItem("TokenForProducts");

    useEffect(()=>{
        Axios.get("https://assignment-api.piton.com.tr/api/v1/product/all",{
          headers:{
            "access-token":lastToken
          }
        }).then((response)=>{
            setAllProducts(response.data.products.filter((x)=>x.likes===1));
			      console.log(allProducts);
        }).catch(()=>{
            console.log("Err");
        });
    },[]);

    const navigate=useNavigate();

    const goBackToProductsPage=()=>{

    navigate("/ProductsPage")

  }
    
  return (
    <div className='bg-gray-50'>
      <div className='absolute left-5 top-5 cursor-pointer' onClick={goBackToProductsPage}><IoMdArrowBack size={30} className="text-blue-700"/></div>
      <h1 className='text-blue-800 text-center font-bold text-2xl  pt-16'>All Favourites</h1>

      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:pt-44 lg:pb-44 pt-4'>
          {allProducts && allProducts.map(product => (
              <div className='w-3/4 text-center flex flex-col justify-center items-center bg-white rounded-3xl gap-y-4 mt-5 mb-8 m-auto' key={product.id}> 
                  <div className='font-bold text-md'>{product.name.substring(0,50)}...</div>
                  <img className='max-w-full h-auto w-2/3' src='https://www.piton.com.tr/images/banner_image.png' />
                  <div className='font-bold text-2xl text-blue-800 '>{product.price}₺</div>
              </div>
          ))}
      </div>
    </div>      
  )

}

export default FavouritePage