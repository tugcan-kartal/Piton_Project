import Axios from 'axios';
import React, { useEffect, useState } from 'react';

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
    
    // console.log(allProducts.filter((x)=>x.likes===1));

  return (

    <div className='grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-gray-50'>
        {allProducts && allProducts.map(product => (
            <div key={product.id}> 
                <img className='max-w-full h-auto' src='https://www.piton.com.tr/images/banner_image.png' />
                <div>{product.name}</div>
                <div>{product.price}</div>
            </div>
        ))}
    </div>

  )

}

export default FavouritePage