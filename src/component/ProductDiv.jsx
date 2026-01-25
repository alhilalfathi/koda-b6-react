import { BsCart2 } from "react-icons/bs"


export const Product = () => {
  return (
    <div className="flex flex-col relative">
        <div className="w-98" >
            <img className="w-full" src="src/assets/img/image27.png" alt="product image"/>
            <span className="absolute top-1 left-1 bg-red-600 text-white rounded-xl w-26 flex items-center justify-center">FLASH SALE!</span>
        </div>
        <div className="w-88 bg-white absolute top-80 left-5 px-4 py-2" >
            <h3 className="text-2xl mb-2">Hazelnut Latte</h3>
            <p className="text-sm text-stone-700 mb-2">You can explore the menu that we provide with fun and have their own taste and make your day better.</p>
            <img src="src/assets/img/Frame41-gray.png" alt="stars icon" />
            <div className="flex gap-2 items-center">
                <del className="text-red-600 ">IDR 20.000</del>
                <h3 className="text-xl text-[#FF8906] mb-2 pt-2">IDR 10.000</h3>
            </div>
            <div className="flex gap-3">
                <a className="w-44 h-10 bg-[#FF8906] rounded flex items-center justify-center" href="">Buy</a>
            <div className="w-12 flex justify-center items-center border-1 border-[#FF8906] rounded">
                <BsCart2 />
            </div>
            </div>
        </div>
    </div>
  )
}
