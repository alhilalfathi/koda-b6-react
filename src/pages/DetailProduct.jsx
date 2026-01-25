import { Footer } from "../component/Footer"
import { NavDiv } from "../component/NavDiv"
import { AiFillLike } from "react-icons/ai";
import { Product } from "../component/ProductDiv";


export const DetailProduct = () => {
  return (
    <div>
        <NavDiv />
        <div className="flex mx-20 my-10 gap-4">
            {/* side image  */}
            <div className="flex flex-col w-[50%] gap-4">
                <img className="w-150 h-150" src="src/assets/img/image31.png" alt="product image" />
                <div className="flex gap-3">
                    <img className="w-48 h-48" src="src/assets/img/image31.png" alt="product image" />
                    <img className="w-48 h-48" src="src/assets/img/image31.png" alt="product image" />
                    <img className="w-48 h-48" src="src/assets/img/image31.png" alt="product image" />
                </div>
            </div>
            {/* content  */}
            <div>
                <span className="bg-red-600 text-white rounded-xl w-26 flex items-center justify-center">FLASH SALE!</span>
                <h1 className="text-4xl py-3">Hazelnut Latte</h1>
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
                <p className="text-[#4F5665] w-148">Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.</p>
                <div className="flex py-3">
                    <button className="border border-[#FF8906] w-8 h-8">-</button>
                    <span className="w-8 text-center border border-white border-y-zinc-300">1</span>
                    <button className="bg-[#FF8906] w-8 h-8">+</button>
                </div>
                <h3 className="font-bold text-xl">Choose Size</h3>
                <div className="flex gap-5 py-3">
                    <button className="w-40 h-8 border border-[#FF8906]">Regular</button>
                    <button className="w-40 h-8 border border-[#E8E8E8]">Medium</button>
                    <button className="w-40 h-8 border border-[#E8E8E8]">Large</button>
                </div>
                <h3 className="font-bold text-xl">Hot/Ice?</h3>
                <div className="flex gap-5 py-3">
                    <button className="w-64 h-8 border border-[#FF8906]">Ice</button>
                    <button className="w-64 h-8 border border-[#E8E8E8]">Hot</button>
                    
                </div>
            </div>
        </div>
        {/* Recommendation  */}
        <div>
            <h2 className="text-4xl mb-8 mx-20 font-bold">Recommendation <span className="text-orange-900">For You</span></h2>
            <div className="flex gap-4 mb-45 justify-center items-center">
                <Product />
                <Product />
                <Product />
            </div>
        </div>
        <Footer />
    </div>
  )
}
