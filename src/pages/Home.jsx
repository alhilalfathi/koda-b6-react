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
                const data = await http("/recommended-products");
                console.log(data)
                setProducts(data.results);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false)
            }
        };

        fetchRecom();
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
        setCurrentTesti((prev) =>
            prev === testi.length - 1 ? 0 : prev + 1
        )
    }
    const prevTesti = () => {
        setCurrentTesti((prev) =>
            prev === 0 ? testi.length - 1 : prev - 1
        )
    }
    return (
        <div>
            <HomeNav />

            <HomeHeader />

            <section className="flex flex-col md:flex-row">
                {/* header */}
                <div className="w-full md:w-1/2 px-6 md:px-20 py-10">
                    <h1 className="text-3xl md:text-6xl font-medium">We Provide <span className="text-yellow-700">Good Cofee</span> and <span className="text-yellow-700">Healthy Meals</span></h1>
                    <p className="my-10">You can explore the menu that we provide with fun and have their own taste and make your day better.</p>
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-4"><img className="w-6 h-6" src={checklistIcon} alt="checklist icon" /><p>High quality beans</p></div>
                        <div className="flex gap-4"><img className="w-6 h-6" src={checklistIcon} alt="checklist icon" /><p>Healthy meals, you can request the ingerdient</p></div>
                        <div className="flex gap-4"><img className="w-6 h-6" src={checklistIcon} alt="checklist icon" /><p>Chat with our staff to get better experience for ordering</p></div>
                        <div className="flex gap-4"><img className="w-6 h-6" src={checklistIcon} alt="checklist icon" /><p>Free member card with a minimum purchase of IDR 200.000.</p></div>
                    </div>
                </div>
                {/* aside */}
                <div className="w-full md:w-1/2"><img src={sideImage} alt="staff image" /></div>
            </section>
            <ChatWidget />
            <section>
                {/* header */}
                <div className="flex flex-col justify-center items-center mt-10">
                    <h1 className="text-3xl md:text-6xl font-medium">Here is People's <span className="text-yellow-700">Favorite</span></h1>
                    <p className="mt-10 mb-20">Let's choose and have a bit taste of people's favorite. It might be yours too!</p>
                </div>
                {/* product list */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-2">
                    {/* product */}
                    {loading ? (
                        <p className="text-xl">Loading favorite products...</p>
                    ) : (products?.map((product) => (
                        <div key={product.product_id} className="flex flex-col relative">
                            <div className="w-64 my-15 md:my-o" >
                                <img className="w-64 h-64" src={product.path} alt={product.product_name} />
                            </div>
                            <div className="w-58 bg-white absolute top-52 left-3 p-2" >
                                <h3 className="text-2xl mb-2">{product.product_name}</h3>
                                <p className="text-sm text-stone-700 mb-2">{product.product_desc}</p>
                                <h3 className="text-xl text-[#FF8906] mb-2">IDR {product.price.toLocaleString("id")}</h3>
                                <div className="flex gap-3">
                                    <Link className="w-44 h-10 bg-[#FF8906] rounded flex items-center justify-center" to={`/detail-product/${product.product_id}`}>Buy</Link>
                                    <div className="w-12 flex justify-center items-center border border-[#FF8906] rounded">
                                        <Link to="/checkout">
                                            <BsCart2 />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )))}
                </div>
            </section>

            <section>
                {/* header */}
                <div className="flex flex-col justify-center items-center mt-70 bg-zinc-50 pt-20">
                    <h1 className="text-3xl md:text-6xl font-medium text-center"> <span className="text-yellow-700">Visit Our Store</span> in the Spot on the Map Below</h1>
                    <p className="mt-10 w-lg text-center">You can explore the menu that we provide with fun and have their own taste and make your day better.</p>
                </div>
                <div className="flex justify-center items-center"><img className="w-275" src="/assets/img/HugeGlobal.png" alt="maps image" /></div>

            </section>
            
            {/* testimoni  */}
            <section>
                <div className="flex justify-center bg-black p-10 md:p-20 gap-4">
                    {showedTesti ? (
                        <div className="flex md:flex-row flex-col gap-10 md:gap-5">
                            {/* image */}
                            <div className="w-full md:w-1/3">
                                <img
                                    src={showedTesti.path}
                                    alt={`User ${showedTesti.user_id}`}
                                    className="w-full h-80 object-cover rounded-lg"
                                />
                            </div>

                            <div className="text-white md:w-2/3">
                                <p className="pb-2 text-sm tracking-widest text-gray-400">TESTIMONIAL</p>
                                <h2 className="text-xl md:text-3xl border-l-4 border-[#FF8906] pl-4 py-2 font-bold">
                                    {showedTesti.fullname}
                                </h2>
                                <p className="text-[#FF8906] pt-4 font-medium">Customer</p>

                                {/* messages */}
                                <p className="w-full max-w-lg py-4 text-lg italic text-gray-300">
                                    "{showedTesti.messages}"
                                </p>

                                {/* rating */}
                                <div className="flex mb-6">
                                    {[...Array(showedTesti.rating)].map((_, i) => (
                                        <span key={i} className="text-yellow-400 text-xl">★</span>
                                    ))}
                                </div>

                                <div className="flex gap-4 py-6">
                                    <button
                                        onClick={prevTesti}
                                        className="w-12 h-12 bg-white rounded-full text-black flex justify-center items-center text-2xl hover:bg-gray-200 transition-colors"
                                    >
                                        &#8592;
                                    </button>
                                    <button
                                        onClick={nextTesti}
                                        className="w-12 h-12 bg-[#FF8906] rounded-full text-black flex justify-center items-center text-2xl hover:bg-[#e67a05] transition-colors"
                                    >
                                        &#8594;
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center w-full">
                            <p className="text-white">Loading reviews...</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    )
}