import { useEffect, useState } from "react"
import { Footer } from "../component/Footer"
import { NavDiv } from "../component/NavDiv"
import { Pagination } from "../component/Pagination"
import { Product } from "../component/ProductDiv"



export const ProductPage = () => {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        const url = "https://raw.githubusercontent.com/alhilalfathi/koda-b6-react/refs/heads/main/src/data/data.json"
        fetch(url).then((res)=> res.json()).then((data)=>{
            setProducts(data)
        }).catch((err)=> console.log(err))

    },[])

  return (
    <div>
        <NavDiv />
        {/* header  */}
        <div className="bg-[url('/src/assets/img/Rectangle299.png')] bg-cover bg-center h-68 w-full flex items-center justify-center px-4 md:px-20 ">
            <h1 className="text-white font-bold text-5xl w-220">We Provide Good Coffee and Healthy Meals</h1>
        </div>

        <div className="flex justify-between items-center px-20">
            <h2 className="text-4xl font-bold">Today <span className="text-orange-900">Promo</span></h2>
            <div className="flex gap-4 py-6">
                    <button className="w-12 h-12 bg-zinc-400 rounded-full text-black flex justify-center items-center text-3xl font-bold">&#8592;</button>
                    <button className="w-12 h-12 bg-[#FF8906] rounded-full text-black flex justify-center items-center text-3xl font-bold">&#8594;</button>
            </div>
        </div>
        {/* promo-card  */}
        <div className="flex gap-4 p-4 overflow-x-auto">
            <div className="flex bg-[#88B788] w-80  h-32 rounded-2xl px-2 pt-4 pb-0">
                <img src="/assets/img/image46.png" alt="promo-icon"/>
                <div className="flex flex-col w-50">
                    <h4>HAPPY MOTHER’S DAY!</h4>
                    <p>Get one of our favorite menu for free!</p>
                    <small>Klaim Kupon</small>
                </div>
            </div>
            <div className="flex bg-[#88B788] w-80  h-32 rounded-2xl px-2 pt-4 pb-0">
                <img src="/assets/img/image46.png" alt="promo-icon"/>
                <div className="flex flex-col w-50">
                    <h4>HAPPY MOTHER’S DAY!</h4>
                    <p>Get one of our favorite menu for free!</p>
                    <small>Klaim Kupon</small>
                </div>
            </div>
            <div className="flex bg-[#88B788] w-80  h-32 rounded-2xl px-2 pt-4 pb-0">
                <img src="/assets/img/image46.png" alt="promo-icon"/>
                <div className="flex flex-col w-50">
                    <h4>HAPPY MOTHER’S DAY!</h4>
                    <p>Get one of our favorite menu for free!</p>
                    <small>Klaim Kupon</small>
                </div>
            </div>
            <div className="flex bg-[#F5C361] w-80  h-32 rounded-2xl px-2 pt-4 pb-0">
                <img src="/assets/img/image43.png" alt="promo-icon"/>
                <div className="flex flex-col w-50">
                    <h4>Get a cup of coffe for free on sunday morning</h4>
                    <p>Only at 7 to 9 AM</p>
                    <small>Klaim Kupon</small>
                </div>
            </div>
        </div>
        {/* content  */}
        <div>
            <div className="mx-20">
                <h2 className="text-4xl mb-8 font-bold">Our <span className="text-orange-900">Product</span></h2>
                <button className="bg-black text-white p-2 mb-10 w-full md:hidden">Filter</button>
            </div>
            <div className="flex mx-20 gap-15">
                <aside className="w-[25%] h-140 bg-black text-white p-5 rounded-xl flex flex-col hidden md:block gap-3">
                    <div className="flex justify-between">
                        <h2>Filter</h2>
                        <h2>Reset Filter</h2>
                    </div>
                    <div className="flex justify-between items-center my-3">
                        <label for="search">Search</label>
                        <input type="text" id="search" placeholder="Search Your Product" className="bg-white text-zinc-600 h-8 px-3 rounded"></input>
                    </div>
                    <div class="category">
                        <label>Category</label>
                        <ul>
                            <li><input type="checkbox"/> Favorite Product</li>
                            <li><input type="checkbox"/> Coffee</li>
                            <li><input type="checkbox"/> Non Coffee</li>
                            <li><input type="checkbox"/> Foods</li>
                            <li><input type="checkbox"/> Add-On</li>
                        </ul>
                    </div>
                    <br/>
                    <div class="sort-by">
                        <label>Sort By</label>
                        <ul class="sort-options">
                            <li><input type="radio" name="sort"/> Buy 1 Get 1</li>
                            <li><input type="radio" name="sort"/> Flash Sale</li>
                            <li><input type="radio" name="sort"/> Birthday Package</li>
                            <li><input type="radio" name="sort"/> Cheap</li>
                        </ul>
                    </div>
                    <div class="price-range">
                        <label>Range Price</label>
                        <input type="range" class="price-slider" min="0" max="100"/>
                    </div>
                    <button className="bg-[#FF8906] w-full h-10 text-black">Apply Filter</button>
                </aside>

                <div className=" grid md:grid-cols-2 grid-cols-1 gap-y-50 gap-x-10 mb-40">
                    {products.map((product) => (
                        <Product key={product.id} product={product} />
                        ))}
                </div>
            </div>
            <div className="md:mx-110 flex justify-center md:justify-end my-5">
                <Pagination />
            </div>
        </div>
        <Footer />
    </div>
  )
}
