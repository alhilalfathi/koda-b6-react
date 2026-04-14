import { HomeHeader } from "../component/HomeHeader";
import { HomeNav } from "../component/HomeNav";
import sideImage from "/assets/img/Rectangle291.png"
import checklistIcon from "/assets/img/Vector.png"
import { BsCart2 } from "react-icons/bs";
import { Footer } from "../component/Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChatWidget } from "../component/Chat";
import http from "../lib/http.js";

export const HomePage = () => {
    const [testi, setTesti] = useState([])
    const [currentTesti, setCurrentTesti] = useState(0)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRecom = async () => {
            try {
                const data = await http("/recommended-products")
                setProducts(data.results || [])
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchRecom()
    }, [])

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await http("/reviews")
                if (response && response.results) {
                    setTesti(response.results)
                }
            } catch (err) {
                console.error("Failed to fetch reviews:", err)
            }
        }
        fetchReviews()
    }, [])

    const showedTesti = testi[currentTesti]

    const nextTesti = () => {
        setCurrentTesti((prev) => prev === testi.length - 1 ? 0 : prev + 1)
    }
    const prevTesti = () => {
        setCurrentTesti((prev) => prev === 0 ? testi.length - 1 : prev - 1)
    }

    return (
        <div className="bg-white overflow-hidden">
            <HomeNav />
            <HomeHeader />

            {/* SECTION: VALUE PROPOSITION */}
            <section className="flex flex-col md:flex-row items-center gap-10 py-16 md:py-24 max-w-7xl mx-auto px-6">
                <div className="w-full md:w-1/2">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
                        We Provide <span className="text-yellow-700">Good Coffee</span> and <span className="text-yellow-700">Healthy Meals</span>
                    </h1>
                    <p className="my-8 text-gray-600 text-lg leading-relaxed">
                        You can explore the menu that we provide with fun and have their own taste and make your day better.
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                        {[
                            "High quality beans",
                            "Healthy meals, you can request the ingredient",
                            "Chat with our staff to get better experience for ordering",
                            "Free member card with a minimum purchase of IDR 200.000."
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 group">
                                <div className="bg-green-100 p-1.5 rounded-full group-hover:bg-green-200 transition-colors">
                                    <img className="w-4 h-4" src={checklistIcon} alt="check" />
                                </div>
                                <p className="text-gray-700 font-medium">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full md:w-1/2">
                    <img src={sideImage} alt="Staff serving coffee" className="w-full rounded-3xl shadow-2xl object-cover" />
                </div>
            </section>

            <ChatWidget />

            {/* SECTION: FAVORITE PRODUCTS */}
            <section className="bg-gray-50 py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col items-center text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                            Here is People's <span className="text-yellow-700">Favorite</span>
                        </h1>
                        <p className="mt-4 text-gray-500 max-w-xl text-lg text-center">
                            Let's choose and have a bit taste of people's favorite. It might be yours too!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {loading ? (
                            <div className="col-span-full text-center py-10 text-xl font-medium text-gray-400">Loading favorite products...</div>
                        ) : (
                            products?.map((product) => (
                                <div key={product.product_id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                                    <div className="relative h-64 overflow-hidden">
                                        <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={product.path} alt={product.product_name} />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{product.product_name}</h3>
                                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.product_desc}</p>
                                        <div className="flex items-center justify-between mt-6">
                                            <h3 className="text-xl font-bold text-[#FF8906]">IDR {product.price.toLocaleString("id")}</h3>
                                            <div className="flex gap-2">
                                                <Link to={`/detail-product/${product.product_id}`} className="px-6 py-2.5 bg-[#FF8906] text-white rounded-xl font-bold shadow-md hover:bg-[#e67a05] transition-colors">
                                                    Buy
                                                </Link>
                                                <Link to="/checkout" className="p-2.5 border-2 border-[#FF8906] text-[#FF8906] rounded-xl hover:bg-orange-50 transition-colors">
                                                    <BsCart2 size={22} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* SECTION: STORE LOCATION */}
            <section className="py-24 bg-white px-6">
                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            <span className="text-yellow-700">Visit Our Store</span> in the Spot on the Map Below
                        </h1>
                        <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg">
                            You can explore the menu that we provide with fun and have their own taste and make your day better.
                        </p>
                    </div>
                    <div className="w-full rounded-3xl overflow-hidden shadow-inner">
                        <img className="w-full h-auto object-cover" src="/assets/img/HugeGlobal.png" alt="Global Store Map" />
                    </div>
                </div>
            </section>
            
            {/* SECTION: TESTIMONIAL */}
            <section className="bg-black py-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    {showedTesti ? (
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="w-full md:w-5/12">
                                <img
                                    src={showedTesti.path}
                                    alt={showedTesti.fullname}
                                    className="w-full h-100 object-cover rounded-3xl shadow-2xl border-4 border-white/10"
                                />
                            </div>

                            <div className="w-full md:w-7/12 text-white">
                                <div className="inline-block px-4 py-1 bg-[#FF8906]/10 rounded-full mb-4">
                                    <p className="text-xs tracking-[0.2em] font-bold text-[#FF8906] uppercase">Testimonial</p>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-extrabold mb-2 text-white">
                                    {showedTesti.fullname}
                                </h2>
                                <p className="text-[#FF8906] font-semibold text-lg italic opacity-90">Verified Customer</p>

                                <div className="relative my-8">
                                    <span className="absolute -top-6 -left-4 text-6xl text-white/10 font-serif">“</span>
                                    <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-200">
                                        {showedTesti.messages}
                                    </p>
                                </div>

                                <div className="flex mb-10 gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`text-2xl ${i < showedTesti.rating ? 'text-yellow-400' : 'text-gray-700'}`}>★</span>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    <button onClick={prevTesti} className="w-14 h-14 border border-white/20 rounded-full flex justify-center items-center hover:bg-white hover:text-black transition-all duration-300">
                                        &#8592;
                                    </button>
                                    <button onClick={nextTesti} className="w-14 h-14 bg-[#FF8906] rounded-full flex justify-center items-center hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/20">
                                        &#8594;
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-64 flex items-center justify-center">
                            <div className="animate-pulse text-gray-500 text-xl font-medium">Loading reviews...</div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    )
}