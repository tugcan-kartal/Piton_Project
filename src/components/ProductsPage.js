import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import Slider from 'react-slick';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import {RiLogoutCircleLine} from "react-icons/ri";
import {MdFavorite} from "react-icons/md";
import {CgDetailsMore} from "react-icons/cg";
import {AiFillHeart,AiOutlineHeart} from "react-icons/ai";
import { toast } from 'react-hot-toast';
import {useNavigate} from "react-router-dom";


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

	const navigate=useNavigate();

    const [allProducts,setAllProducts]=useState([]);

	const [allFavourites,setAllFavourites]=useState([]);

    const lastToken=localStorage.getItem("TokenForProducts");

    useEffect(()=>{
        Axios.get("https://assignment-api.piton.com.tr/api/v1/product/all",{
          headers:{
            "access-token":lastToken
          }
        }).then((response)=>{
            setAllProducts(response.data.products);
        }).catch((err)=>{
            console.log(err);
        });
    },[]);

	const addToFavourite=async(productId)=>{
	
		const {data}=await Axios.post("https://assignment-api.piton.com.tr/api/v1/product/like",{productId: productId},{
			headers: {
				"access-token":lastToken
			}
		});

		const statusOfAdd=data.status;

		if (statusOfAdd==="Success") {
			toast.success("Product is added")
		} else {
			toast.error("Product is not added")
		}
	}

	const removeToFavourite=async(productId)=>{

		const {data}=await Axios.post("https://assignment-api.piton.com.tr/api/v1/product/unlike",{productId: productId},{
			headers: {
				"access-token":lastToken
			}
		});

		const statusOfAdd=data.status;

		if (statusOfAdd==="Success") {
			toast.success("Product is removed")
		} else {
			toast.error("Product is not removed")
		}

	}

	const showDetails=async(productId)=>{

		const {data}=await Axios.get(`https://assignment-api.piton.com.tr/api/v1/product/get/${productId}`,{
			headers:{
				"access-token":lastToken
			}
		})

		localStorage.setItem("lastProductDetails",JSON.stringify(data.product));

		navigate(`/ProductDetails`);

	}

	const logOutFromProductsPage=()=>{
		navigate("/");
		localStorage.removeItem("TokenForProducts");
		localStorage.removeItem("lastProductDetails");
		toast.success("User logged out");
	}

	const goToFavouritePage=()=>{
		navigate("/FavouritePage");
		toast.success("successful");
	}

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
				breakpoint: 1536,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 1280,
				settings: {
					slidesToShow: 2
				}
			},
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
    
      <div className='bg-gray-50 h-[100vh] relative'>

		<div onClick={logOutFromProductsPage} className='absolute left-5 top-5 cursor-pointer'> <RiLogoutCircleLine size={30} className="text-blue-800"/> </div>
		<div onClick={goToFavouritePage} className="absolute right-5 top-5 cursor-pointer"><MdFavorite size={30} className="text-blue-800"/></div>

	  	<h3 className="font-bold text-3xl text-blue-800 text-center pt-16 mb-32">All Products</h3>

		<div className="w-3/4 m-auto">
			
			<Slider className='cursor-grab active:cursor-grabbing' {...settings}>

				{allProducts && allProducts.map(product => (
					<div key={product.id} className="text-center bg-white rounded-large shadow-md relative">
						<button onClick={()=>removeToFavourite(product.id)} className='p-2 rounded-full absolute top-0 left-0 text-black bg-gray-200'> <AiOutlineHeart className='text-red-500'/> </button>
						<button onClick={()=>showDetails(product.id)} className='p-2 rounded-full absolute top-0 text-blue-700 bg-gray-200'> <CgDetailsMore /> </button>
						<button onClick={()=>addToFavourite(product.id)} className='p-2 rounded-full absolute top-0 right-2 text-black bg-gray-200'> <AiFillHeart className='text-red-500'/> </button>
						<img alt='not found' className='w-full scale-75 sm:h-[55vh]' src={"https://assignment-api.piton.com.tr"+product.image} />
						<h1 className="font-semibold text-lg">{product.name.substring(0,25)}...</h1>
						<h1 className="font-bold text-2xl text-blue-700">{product.price} ₺</h1>
					</div>
				))}

			</Slider>

		</div>
		
      </div>
    
  )

}

export default ProductsPage