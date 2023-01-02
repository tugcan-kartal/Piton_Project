import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import Slider from 'react-slick';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import {GrAdd} from "react-icons/gr";

function NextButton ({ onClick, className }) {
	return (
		<button className={`${className} text-blue-700`}  onClick={onClick}>
			<IoIosArrowForward size={22} />
		</button>
	)
}
function PrevButton ({ onClick, className }) {
	return (
		<button className={`${className} text-blue-700`} onClick={onClick}>
			<IoIosArrowBack size={22} />
		</button>
	)
}

function ProductsPage() {

    const [allProducts,setAllProducts]=useState([]);

    const lastToken=localStorage.getItem("TokenForProducts");

    useEffect(()=>{
        Axios.get("https://assignment-api.piton.com.tr/api/v1/product/all",{
          headers:{
            "access-token":lastToken
          }
        }).then((response)=>{
            setAllProducts(response.data.products);
			console.log(response.data.products);
        }).catch(()=>{
            console.log("Err");
        });
    },[]);

    const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		nextArrow: <NextButton />,
		prevArrow: <PrevButton />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1
				}
			}
		]
	};

  return (

    
      <div className='bg-gray-50 h-[100vh]'>

	  	<h3 className="font-bold text-2xl text-blue-800 text-center pt-8">All Products</h3>

		<div className="mt-48 w-3/4 m-auto">
			
			<Slider className='' {...settings}>
				{allProducts && allProducts.map(product => (
					<div key={product.id} className="text-center bg-white rounded-large shadow-md">
						<button className='p-2 rounded-full relative left-40 text-blue-700 bg-gray-200'> <GrAdd /> </button>
						<img className='w-full scale-75' src='https://www.piton.com.tr/images/banner_image.png'/>
						<h1 className="font-semibold text-lg">{product.name.slice(0,35)}...</h1>
						<h1 className="font-bold text-2xl text-blue-700">{product.price} ₺</h1>
					</div>
				))}
			</Slider>

		</div>
		
      </div>
    
  )

}

export default ProductsPage