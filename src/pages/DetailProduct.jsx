import { Footer } from "../component/Footer"
import { NavDiv } from "../component/NavDiv"
import { AiFillLike } from "react-icons/ai";
import { Product } from "../component/ProductDiv";
import cartIcon from "../assets/img/ShoppingCart-yellow.png"
import { Pagination } from "../component/Pagination";
import { Link } from "react-router-dom";


export const DetailProduct = () => {
  return (
    <div>
        <NavDiv />
        <div className="flex md:flex-row flex-col mx-20 my-10 gap-4">
            {/* side image  */}
            <div className="flex flex-col w-1/2 gap-4 ">
                <img className=" w-full md:h-150" src="src/assets/img/image31.png" alt="product image" />
                <div className="md:flex gap-3 hidden md:items-center md:justify-center">
                    <img className="md:w-[32%] w-15 h-15 md:h-full" src="src/assets/img/image31.png" alt="product image" />
                    <img className="md:w-[32%] w-15 h-15 md:h-full" src="src/assets/img/image31.png" alt="product image" />
                    <img className="md:w-[32%] w-15 h-15 md:h-full" src="src/assets/img/image31.png" alt="product image" />
                </div>
            </div>
            {/* content  */}
            <div className="w-1/2">
                <span className="bg-red-600 text-white rounded-xl w-26  flex items-center justify-center">FLASH SALE!</span>
                <h1 className="md:text-4xl text-xl py-3">Hazelnut Latte</h1>
                <div className="flex gap-2 items-center">
                    <del className="text-red-600 ">IDR 20.000</del>
                    <h3 className="text-xl text-[#FF8906] mb-2 pt-2">IDR 10.000</h3>
                </div>
                <img src="src/assets/img/Frame41-gray.png" alt="stars icon" />
                <div className="flex text-[#4F5665] gap-3 py-2 text-xl">
                    <p>200+Review</p>
                    <p>Recommendation</p>
                    <AiFillLike />
                </div>
                <p className="text-[#4F5665] w-80 md:w-148">Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.</p>
                <div className="flex py-3">
                    <button className="border border-[#FF8906] w-8 h-8">-</button>
                    <span className="w-8 text-center border border-white border-y-zinc-300">1</span>
                    <button className="bg-[#FF8906] w-8 h-8">+</button>
                </div>
                <h3 className="font-bold text-xl">Choose Size</h3>
                <div className="flex gap-5 py-3">
                    <button className="w-1/3 h-8 border border-[#FF8906]">Regular</button>
                    <button className="w-1/3 h-8 border border-[#E8E8E8]">Medium</button>
                    <button className="w-1/3 h-8 border border-[#E8E8E8]">Large</button>
                </div>
                <h3 className="font-bold text-xl">Hot/Ice?</h3>
                <div className="flex gap-5 py-3">
                    <button className="w-1/2 h-8 border border-[#FF8906]">Ice</button>
                    <button className="w-1/2 h-8 border border-[#E8E8E8]">Hot</button>
                    
                </div>
                <div className="flex gap-5 my-5">
                    <button className="bg-[#FF8906] w-1/2 p-3 rounded cursor-pointer"><Link to="/detail-order">Buy</Link></button>
                    <span className="flex gap-3 w-1/2 border border-[#FF8906] p-3 justify-center rounded cursor-pointer">
                        <img src={cartIcon} alt="cart"></img>
                        <button><Link to="/checkout">Add to cart</Link></button>
                    </span>
                </div>
            </div>
        </div>
        {/* Recommendation  */}
        <div>
            <h2 className="text-4xl mb-8 mx-20 font-bold">Recommendation <span className="text-orange-900">For You</span></h2>
            <div className="flex flex-col md:flex-row gap-4 mb-20 md:mb-45 justify-center items-center">
                <Product />
                <Product />
                <Product />
            </div>
        </div>
        <div className="my-15 w-full flex justify-center">
            <Pagination />
        </div>
        <Footer />
    </div>
  )
}
