import { HomeHeader } from "../component/HomeHeader";
import { HomeNav } from "../component/HomeNav";
import sideImage from "/assets/img/Rectangle291.png"
import checklistIcon from "/assets/img/Vector.png"
import { BsCart2 } from "react-icons/bs";
import { Footer } from "../component/Footer";
import { useEffect, useState } from "react";

export const HomePage = ()=>{
    const [products, setProducts] = useState([])

    useEffect(()=>{
        const url = "https://raw.githubusercontent.com/alhilalfathi/koda-b6-react/refs/heads/main/src/data/data.json"
        fetch(url).then((res)=> res.json()).then((data)=>{
            setProducts(data)
        }).catch((err)=> console.log(err))
    },[])
    return(
        <div>
            <HomeNav />

            <HomeHeader />

            <section className="flex flex-col md:flex-row">
                        {/* header */}
                <div className="w-full md:w-1/2 px-6 md:px-20 py-10">
                    <h1 className="text-3xl md:text-6xl font-medium">We Provide <span className="text-yellow-700">Good Cofee</span> and <span className="text-yellow-700">Healthy Meals</span></h1>
                    <p className="my-10">You can explore the menu that we provide with fun and have their own taste and make your day better.</p>
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-4"><img className="w-6 h-6" src={checklistIcon} alt="checklist icon"/><p>High quality beans</p></div>
                        <div className="flex gap-4"><img className="w-6 h-6" src={checklistIcon} alt="checklist icon"/><p>Healthy meals, you can request the ingerdient</p></div>
                        <div className="flex gap-4"><img className="w-6 h-6" src={checklistIcon} alt="checklist icon"/><p>Chat with our staff to get better experience for ordering</p></div>
                        <div className="flex gap-4"><img className="w-6 h-6" src={checklistIcon} alt="checklist icon"/><p>Free member card with a minimum purchase of IDR 200.000.</p></div>
                    </div>
                </div>
                        {/* aside */}
                <div className="w-full md:w-1/2"><img src={sideImage} alt="staff image" /></div>
            </section>

            <section>
                        {/* header */}
                <div className="flex flex-col justify-center items-center mt-10">
                    <h1 className="text-3xl md:text-6xl font-medium">Here is People's <span className="text-yellow-700">Favorite</span></h1>
                    <p className="mt-10 mb-20">Let's choose and have a bit taste of people's favorite. It might be yours too!</p>
                </div>
                        {/* product list */}
                <div className="flex justify-center items-center gap-2">
                        {/* product */}
                        {products.map((product)=>(
                            <div className="flex flex-col relative">
                                <div className="w-64" >
                                    <img src={product.img} alt={product.name}/>
                                </div>
                                <div className="w-58 bg-white absolute top-52 left-3 p-2" >
                                    <h3 className="text-2xl mb-2">{product.name}</h3>
                                    <p className="text-sm text-stone-700 mb-2">{product.tag}</p>
                                    <h3 className="text-xl text-[#FF8906] mb-2">IDR {product.price.toLocaleString("id")}</h3>
                                    <div className="flex gap-3">
                                        <a className="w-44 h-10 bg-[#FF8906] rounded flex items-center justify-center" href="">Buy</a>
                                        <div className="w-12 flex justify-center items-center border border-[#FF8906] rounded">
                                            <BsCart2 />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </section>

            <section>
                       {/* header */}
                <div className="flex flex-col justify-center items-center mt-70 bg-zinc-50 pt-20">
                    <h1 className="text-3xl md:text-6xl font-medium text-center"> <span className="text-yellow-700">Visit Our Store</span> in the Spot on the Map Below</h1>
                    <p className="mt-10 w-128 text-center">You can explore the menu that we provide with fun and have their own taste and make your day better.</p>
                </div>
                <div className="flex justify-center items-center"><img className="w-300 " src="src/assets/img/HugeGlobal.png" alt="maps image" /></div>

            </section>

            <section>
                <div className="flex bg-black p-20 gap-4">
                    <div>
                        <img src="/assets/img/Rectangle295.png" alt="295"/>
                    </div>
                    <div className="text-white">
                        <p className="pb-4">TESTIMONIAL</p>
                        <h2 className="text-3xl border border-black border-l-[#FF8906] pl-4 py-4">Viezh Robert</h2>
                        <p className="text-[#FF8906] pt-4">Manager Coffe Shop</p>
                        <p className="w-128 py-4">“Wow... I am very happy to spend my whole day here. the Wi-fi is good, and the coffee and meals tho. I like it here!! Very recommended!</p>
                        <div><img src="/assets/img/Frame41.png" alt="41"/></div>
                        <div className="flex gap-4 py-6">
                            <div className="w-12 h-12 bg-white rounded-full text-black flex justify-center items-center text-3xl font-bold">&#8592;</div>
                            <div className="w-12 h-12 bg-[#FF8906] rounded-full text-black flex justify-center items-center text-3xl font-bold">&#8594;</div>
                        </div>
                        <div><img src="/assets/img/Group1300.png" alt="1300"/></div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}