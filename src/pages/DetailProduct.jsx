import { Footer } from "../component/Footer"
import { NavDiv } from "../component/NavDiv"
import { AiFillLike } from "react-icons/ai";
import { Product } from "../component/ProductDiv";
import cartIcon from "/assets/img/ShoppingCart-yellow.png"
import { Pagination } from "../component/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";



export const DetailProduct = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [recom, setRecom] = useState(null)

    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState("Regular")
    const [temp, setTemp] =useState("Ice")

    const sizes = ["Regular", "Medium", "Large"]
    const temps = ["Ice","Hot"]

    const activeClass = "border border-[#FF8906]"
    const inactiveClass = "border border-[#E8E8E8]  "

    useEffect(() => {
    const url =
      "https://raw.githubusercontent.com/alhilalfathi/koda-b6-react/refs/heads/main/src/data/data.json"

      fetch(url).then((res) => res.json()).then((data) => {

        const selected = data.find((item) => item.id === Number(id))
        const recommendation = data.find((item) => item.id !== Number(id))
        
        setProduct(selected)
        setRecom(recommendation)
        setQuantity(1)
        setSize("Regular")
        setTemp("Ice")

      }).catch((err) => {
            console.log(err)
        })

    }, [id])

    const handleIncrease = () => {
        setQuantity((prev)=> prev + 1)
    }
    const handleDecrease = () => {
        setQuantity((prev)=> prev > 1 ? prev - 1 : 1)
    }
    const addToCart = () => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
        if(!loggedUser){
            return alert("You need to login")
        }
        const cart = JSON.parse(localStorage.getItem("cart")) || {}
        const userCart = cart[loggedUser.email] || []

        const newItem = {
            productId: product.id,
            name: product.name,
            discountPrice: product.discountPrice,
            price: product.price,
            quantity,
            size,
            temp,
            img: product.img
        }
        const existingData = userCart.findIndex(
            (item)=> 
                item.productId === newItem.productId &&
                item.size === newItem.size &&
                item.temp === newItem.temp 
        )
        if (existingData !== -1){
            userCart[existingData].quantity += quantity
        }else {
            userCart.push(newItem)
        }
        cart[loggedUser.email] = userCart
        localStorage.setItem("cart",JSON.stringify(cart))
        alert("Item added to cart")
    }
    const buyProduct = () => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
        if(!loggedUser){
            return alert("You need to login")
        }
        const cart = JSON.parse(localStorage.getItem("cart")) || {}
        const userCart = cart[loggedUser.email] || []

        const newItem = {
            productId: product.id,
            name: product.name,
            discountPrice: product.discountPrice,
            price: product.price,
            quantity,
            size,
            temp,
            img: product.img
        }
        const existingData = userCart.findIndex(
            (item)=> 
                item.productId === newItem.productId &&
                item.size === newItem.size &&
                item.temp === newItem.temp 
        )
        if (existingData !== -1){
            userCart[existingData].quantity += quantity
        }else {
            userCart.push(newItem)
        }
        cart[loggedUser.email] = userCart
        localStorage.setItem("cart",JSON.stringify(cart))
        navigate("/checkout")
    }
    
    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl">Product not found</p>
            </div>
            )
    }


  return (
    <div>
        <NavDiv />
        <div className="flex md:flex-row flex-col mx-20 my-10 gap-4">
            {/* side image  */}
            <div className="flex flex-col w-1/2 gap-4 ">
                <img className=" w-full md:h-150" src={product.img} alt={product.name} />
                <div className="md:flex gap-3 hidden md:items-center md:justify-center">
                    <img className="md:w-[32%] w-15 h-15 md:h-full" src={product.imgUrl1} alt="product image" />
                    <img className="md:w-[32%] w-15 h-15 md:h-full" src={product.imgUrl2} alt="product image" />
                    <img className="md:w-[32%] w-15 h-15 md:h-full" src={product.imgUrl3} alt="product image" />
                </div>
            </div>
            {/* content  */}
            <div className="w-1/2">
                <span className="bg-red-600 text-white rounded-xl w-26  flex items-center justify-center">FLASH SALE!</span>
                <h1 className="md:text-4xl text-xl py-3">{product.name}</h1>
                <div className="flex gap-2 items-center">
                    <del className="text-red-600 ">IDR {product.price.toLocaleString("id")}</del>
                    <h3 className="text-xl text-[#FF8906] mb-2 pt-2">IDR {product.discountPrice.toLocaleString("id")}</h3>
                </div>
                <img src="/assets/img/Frame41-gray.png" alt="stars icon" />
                <div className="flex text-[#4F5665] gap-3 py-2 text-xl">
                    <p>200+Review</p>
                    <p>Recommendation</p>
                    <AiFillLike />
                </div>
                <p className="text-[#4F5665] w-80 md:w-148">Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.</p>
                <div className="flex py-3">
                    <button onClick={handleDecrease} className="border border-[#FF8906] w-8 h-8">-</button>
                    <span className="w-8 text-center border border-white border-y-zinc-300">{quantity}</span>
                    <button onClick={handleIncrease} className="bg-[#FF8906] w-8 h-8">+</button>
                </div>
                <h3 className="font-bold text-xl">Choose Size</h3>
                <div className="flex gap-5 py-3">
                    {sizes.map((item) => (
                        <button key={item} onClick={()=> setSize(item)} className={`w-1/3 h-8 border transition ${size === item ? activeClass : inactiveClass}`} >{item}</button>
                    ))}
                </div>
                <h3 className="font-bold text-xl">Hot/Ice?</h3>
                <div className="flex gap-5 py-3">
                    {temps.map((item)=>(
                        <button key={item} onClick={()=> setTemp(item)} className={`w-1/2 h-8 border rounded transition ${temp === item ? activeClass : inactiveClass}`} >{item}</button>
                    ))}
                </div>
                <div className="flex gap-5 my-5">
                    <button onClick={buyProduct} className="bg-[#FF8906] w-1/2 p-3 rounded cursor-pointer">Buy</button>
                    <span className="flex gap-3 w-1/2 border border-[#FF8906] p-3 justify-center rounded cursor-pointer">
                        <img src={cartIcon} alt="cart"/>
                        <button onClick={addToCart}>Add to cart</button>
                    </span>
                </div>
            </div>
        </div>
        {/* Recommendation  */}
        <div>
            <h2 className="text-4xl mb-8 mx-20 font-bold">Recommendation <span className="text-orange-900">For You</span></h2>
            <div className="flex flex-col md:flex-row gap-4 mb-20 md:mb-45 justify-center items-center">
                <Product product={recom} />
                <Product product={recom} />
                <Product product={recom} />
            </div>
        </div>
        <div className="my-15 w-full flex justify-center">
            <Pagination />
        </div>
        <Footer />
    </div>
  )
}
