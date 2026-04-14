import { Footer } from "../component/Footer"
import { NavDiv } from "../component/NavDiv"
import { AiFillLike, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Product } from "../component/ProductDiv";
import cartIcon from "/assets/img/ShoppingCart-yellow.png"
import { Pagination } from "../component/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../component/context/DataContext";
import { useSelector, useDispatch } from "react-redux"
import { addToCart } from "../redux/reducers/cartReducer";
import http from "../lib/http.js";

export const DetailProduct = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const [product, setProduct] = useState(null)
    const [recom, setRecom] = useState(null)

    const { products, loading } = useContext(DataContext)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)

    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState("Regular")
    const [temp, setTemp] = useState("Ice")

    const sizes = ["Regular", "Medium", "Large"]
    const temps = ["Ice", "Hot"]

    // Styling dinamis
    const activeClass = "border-2 border-[#FF8906] bg-orange-50 text-[#FF8906] font-bold shadow-sm"
    const inactiveClass = "border border-gray-200 text-gray-500 hover:bg-gray-50"

    useEffect(() => {
        if (products.length === 0) return

        const selected = products.find((item) => item.product_id === Number(id))
        const recommendation = products
            .filter((item) => item.product_id !== Number(id))
            .slice(0, 3)

        setProduct(selected)
        setRecom(recommendation)
        setQuantity(1)
        setSize("Regular")
        setTemp("Ice")
    }, [id, products])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-white text-gray-400">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-[#FF8906] border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-xl">Loading deliciousness...</p>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-gray-400 font-medium">Product not found</p>
            </div>
        )
    }

    const handleIncrease = () => setQuantity((prev) => prev + 1)
    const handleDecrease = () => setQuantity((prev) => prev > 1 ? prev - 1 : 1)

    // cart 
    const handleAddToCart = async (redirect = false) => {
        if (!user) return alert("You need to login")

        const payload = {
            product_id: product.product_id,
            quantity: quantity,
            size: size,
            variant: temp
        }

        try {
            const response = await http("/admin/cart/", {
                method: "POST",
                body: payload
            })

            if (response.success) {
                const reduxItem = {
                    productId: product.product_id,
                    name: product.product_name,
                    price: product.price,
                    quantity,
                    size,
                    temp,
                    img: product.path
                }

                dispatch(addToCart({ email: user.email, item: reduxItem }))
                if (redirect) navigate("/checkout")
                else alert("Item added to cart!")
            } else {
                alert(response.message || "Failed to add to cart")
            }
        } catch (error) {
            console.error("Add to Cart Error:", error)
            alert("Connection error to server")
        }
    }

    return (
        <div className="bg-white">
            <NavDiv />

            <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
                <div className="flex flex-col lg:flex-row gap-12">
                    
                    {/* LEFT SIDE: IMAGE GALLERY */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-6">
                        <div className="relative group overflow-hidden rounded-3xl shadow-lg">
                            <img className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105" src={product.path} alt={product.product_name} />
                            <span className="absolute top-6 left-6 bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                                FLASH SALE!
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#FF8906] transition-all cursor-pointer shadow-sm">
                                    <img className="w-full aspect-square object-cover opacity-80 hover:opacity-100 transition-opacity" src={product.path} alt="thumbnail" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE: PRODUCT INFO */}
                    <div className="w-full lg:w-1/2 flex flex-col">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                            {product.product_name}
                        </h1>
                        
                        <div className="flex items-center gap-4 my-6">
                            <h3 className="text-3xl font-bold text-[#FF8906]">
                                IDR {product.price.toLocaleString("id")}
                            </h3>
                            <del className="text-red-400 font-medium text-lg italic">
                                IDR {(product.price * 1.2).toLocaleString("id")}
                            </del>
                        </div>

                        <div className="flex items-center gap-6 mb-8 text-gray-500">
                            <div className="flex items-center gap-2">
                                <img src="/assets/img/Frame41-gray.png" alt="stars" className="h-4" />
                                <span className="text-sm font-semibold">4.8 (200+ Reviews)</span>
                            </div>
                            <div className="flex items-center gap-1 text-[#FF8906]">
                                <AiFillLike size={20} />
                                <span className="text-sm font-bold">Recommended</span>
                            </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed text-lg mb-8 max-w-lg">
                            {product.product_desc || "Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is steeped for as long as 48 hours."}
                        </p>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4 mb-8">
                            <span className="font-bold text-gray-800">Quantity</span>
                            <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100 shadow-inner">
                                <button onClick={handleDecrease} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-colors text-gray-600">
                                    <AiOutlineMinus />
                                </button>
                                <span className="w-12 text-center font-bold text-gray-800">{quantity}</span>
                                <button onClick={handleIncrease} className="w-10 h-10 flex items-center justify-center bg-[#FF8906] text-white rounded-lg shadow-md">
                                    <AiOutlinePlus />
                                </button>
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div className="mb-8">
                            <h3 className="font-bold text-gray-800 mb-4">Choose Size</h3>
                            <div className="flex gap-3">
                                {sizes.map((item) => (
                                    <button 
                                        key={item} 
                                        onClick={() => setSize(item)} 
                                        className={`flex-1 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${size === item ? activeClass : inactiveClass}`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Temp Selector */}
                        <div className="mb-10">
                            <h3 className="font-bold text-gray-800 mb-4">Variation</h3>
                            <div className="flex gap-3">
                                {temps.map((item) => (
                                    <button 
                                        key={item} 
                                        onClick={() => setTemp(item)} 
                                        className={`flex-1 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${temp === item ? activeClass : inactiveClass}`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                            <button 
                                onClick={() => handleAddToCart(true)} 
                                className="flex-1 bg-[#FF8906] hover:bg-orange-600 text-white font-extrabold py-5 rounded-2xl shadow-lg shadow-orange-100 transition-all active:scale-95"
                            >
                                Buy Now
                            </button>
                            <button 
                                onClick={() => handleAddToCart(false)} 
                                className="flex-1 flex items-center justify-center gap-3 border-2 border-[#FF8906] text-[#FF8906] font-extrabold py-5 rounded-2xl hover:bg-orange-50 transition-all active:scale-95"
                            >
                                <img src={cartIcon} alt="cart" className="w-6 h-6" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recommendation SECTION */}
                <div className="mt-32">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12">
                        Recommendation <span className="text-[#FF8906]">For You</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-32 gap-x-10 mb-20">
                        {recom && recom.map((item) => (
                            <Product key={item.product_id} product={item} />
                        ))}
                    </div>

                    <div className="mt-40 w-full flex justify-center">
                        <Pagination />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}