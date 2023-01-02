import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import Slider from 'react-slick';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

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

    const lastToken=localStorage.getItem("Token For Products");

    useEffect(()=>{
        Axios.get("https://assignment-api.piton.com.tr/api/v1/product/all",{
          headers:{
            "access-token":lastToken
          }
        }).then((response)=>{
            setAllProducts(response.data.products);
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

    <>
      <div>

        <h1>All Products</h1>
        
        
            {allProducts && allProducts.map(product=>(
                <div key={product.id}>
                    <h1>{product.name}</h1>
                    <h1>{product.price}</h1>
                </div>
            ))}          
        

      </div>
    </>
  )

}

export default ProductsPage