import { BsCart2 } from "react-icons/bs"
import { Link } from "react-router-dom"
import starsIcon from "/assets/img/Frame41-gray.png"


export const Product = ({product}) => {
  return (
    <div className="flex flex-col relative">
        <div className="w-98" >
            <img className="md:w-full w-60" src={product.img} alt={product.name}/>
            <span className="absolute top-1 left-1 bg-red-600 text-white rounded-xl w-26 flex items-center justify-center">FLASH SALE!</span>
        </div>
        <div className="md:w-88 w-60 bg-white md:absolute md:top-80 md:left-5 md:px-4 p-2 md:py-2" >
            <h3 className="text-xl md:text-2xl mb-2">{product.name}</h3>
            <p className="text-sm text-stone-700 mb-2">{product.tag}</p>
            <img src={starsIcon} alt="stars icon" />
            <div className="flex gap-2 items-center">
                <del className="text-red-600 ">IDR {product.price.toLocaleString("id")}</del>
                <h3 className="text-xl text-[#FF8906] mb-2 pt-2">IDR {product.discountPrice.toLocaleString("id")}</h3>
            </div>
            <div className="flex gap-3">
                <Link className="w-full h-10 bg-[#FF8906] rounded flex items-center justify-center" to={`/detail-product/${product.id}`} >Buy</Link>
            <div className="w-12 flex justify-center items-center border border-[#FF8906] rounded">
                <Link to="/checkout">
                    <BsCart2 />
                </Link>
            </div>
            </div>
        </div>
    </div>
  )
}
