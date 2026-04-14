import { BsCart2 } from "react-icons/bs"
import { Link } from "react-router-dom"
import starsIcon from "/assets/img/Frame41-gray.png"


export const Product = ({product}) => {
  return (
    <div className="flex flex-col relative group">
        {/* product image  */}
        <div className="w-full relative overflow-hidden rounded-3xl shadow-sm transition-all duration-300 group-hover:shadow-xl" >
            <img 
                className="w-full h-100 object-cover transition-transform duration-500 group-hover:scale-110" 
                src={product.path} 
                alt={product.product_name}
            />
            <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                FLASH SALE!
            </span>
        </div>

        {/* product description  */}
        <div className="md:w-[90%] w-full bg-white md:absolute md:-bottom-20 md:left-1/2 md:-translate-x-1/2 rounded-2xl p-5 shadow-lg border border-gray-100 transition-all duration-300 group-hover:-translate-y-2" >
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 truncate">
                {product.product_name}
            </h3>
            <p className="text-sm text-stone-500 mb-3 line-clamp-2 leading-relaxed">
                {product.product_desc}
            </p>
            
            <div className="mb-3">
                <img src={starsIcon} alt="stars icon" className="h-4" />
            </div>

            <div className="flex gap-2 items-center mb-4">
                <del className="text-red-400 text-sm italic">
                    IDR {(product.price * 1.2).toLocaleString("id")}
                </del>
                <h3 className="text-xl font-extrabold text-[#FF8906]">
                    IDR {product.price.toLocaleString("id")}
                </h3>
            </div>

            <div className="flex gap-3">
                <Link 
                    className="flex-1 h-11 bg-[#FF8906] hover:bg-orange-600 text-white font-bold rounded-xl flex items-center justify-center transition-colors shadow-md shadow-orange-200" 
                    to={`/detail-product/${product.product_id}`} 
                >
                    Buy
                </Link>
                <Link 
                    to="/checkout"
                    className="w-12 h-11 flex justify-center items-center border-2 border-[#FF8906] text-[#FF8906] rounded-xl hover:bg-orange-50 transition-colors"
                >
                    <BsCart2 size={20} />
                </Link>
            </div>
        </div>
    </div>
  )
}