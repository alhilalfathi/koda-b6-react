import { useContext, useRef, useState } from "react"
import { Footer } from "../component/Footer"
import { NavDiv } from "../component/NavDiv"
import { Pagination } from "../component/Pagination"
import { Product } from "../component/ProductDiv"
import { DataContext } from "../component/context/DataContext"

const PromoCard = (promo) => {
    return (
        <div className={`flex items-center ${promo.color} w-80 shrink-0 h-32 rounded-2xl px-4 py-2 shadow-sm hover:scale-105 transition-transform duration-300`}>
            <img src={promo.icon} alt="promo-icon" className="w-20 h-20 object-contain" />
            <div className="flex flex-col ml-3">
                <h4 className="font-bold text-sm text-gray-800 uppercase leading-tight">HAPPY MOTHER’S DAY!</h4>
                <p className="text-xs text-gray-700 my-1">Get one of our favorite menu for free!</p>
                <small className="text-white font-bold cursor-pointer hover:underline">Klaim Kupon</small>
            </div>
        </div>
    )
}

export const ProductPage = () => {
    const promoRef = useRef()
    const { products } = useContext(DataContext)

    const [search, setSearch] = useState("")
    const [searchInput, setSearchInput] = useState("")
    const [categories, setCategories] = useState([])
    // const [favorite, setFavorite] = useState(false)
    const [sort, setSort] = useState("")

    const [currentPage, setCurrentPage] = useState(1)

    const scrollButtonRight = () => {
        promoRef.current.scrollLeft += 200
    }
    const scrollButtonLeft = () => {
        promoRef.current.scrollLeft -= 200
    }
    const handleApplyFilter = () => {
        setSearch(searchInput)
        setCurrentPage(1)
    }
    const handleCategoryChange = (value) => {
        setCategories(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value])
    }
    const handleReset = () => {
        setSearch("")
        setSearchInput("")
        setCategories([])
        // setFavorite(false)
        setSort("")
    }
    let filteredProducts = products.filter(product => {
        const matchSearch = product.product_name?.toLowerCase().includes(search.toLowerCase())
        const matchCategory =
            categories.length === 0 ||
            categories.some(cat => product.category?.toLowerCase().includes(cat.toLowerCase()))
        // const matchFavorite = !favorite || product.favorite === true
        return matchSearch && matchCategory //&& matchFavorite
    })

    // if (sort === "flashSale") {
    //     filteredProducts = filteredProducts.filter(p => p.flashSale)
    // }

    if (sort === "cheap") {
        filteredProducts = [...filteredProducts].sort(
            (a, b) => a.price - b.price
        )
    }

    // Pagination
    const itemsPerPage = 6  //limit
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage  //offset
    const endIndex = startIndex + itemsPerPage
    const currentProducts = filteredProducts.slice(startIndex, endIndex)

    return (
        <div className="bg-white">
            <NavDiv />
            {/* header  */}
            <div className="bg-[url('/assets/img/Rectangle299.png')] bg-cover bg-center h-80 w-full flex items-center px-6 md:px-20">
                <h1 className="text-white font-bold text-4xl md:text-5xl max-w-3xl leading-tight">
                    We Provide Good Coffee and Healthy Meals
                </h1>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-10 mt-10">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl md:text-4xl font-bold">Today <span className="text-orange-900">Promo</span></h2>
                    <div className="flex gap-4 py-6">
                        {/* promo button  */}
                        <button onClick={scrollButtonLeft} className="w-12 h-12 bg-zinc-200 hover:bg-zinc-300 rounded-full text-black flex justify-center items-center text-3xl font-bold cursor-pointer transition-all">&#8592;</button>
                        <button onClick={scrollButtonRight} className="w-12 h-12 bg-[#FF8906] hover:bg-orange-600 rounded-full text-black flex justify-center items-center text-3xl font-bold cursor-pointer transition-all">&#8594;</button>
                    </div>
                </div>
            </div>

            {/* promo-card  */}
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div ref={promoRef} className="scroll-bar flex gap-6 p-4 overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth">
                    <PromoCard icon={"/assets/img/image46.png"} color={"bg-[#88B788]"} />
                    <PromoCard icon={"/assets/img/image46.png"} color={"bg-[#88B788]"} />
                    <PromoCard icon={"/assets/img/image46.png"} color={"bg-[#88B788]"} />
                    <PromoCard icon={"/assets/img/image46.png"} color={"bg-[#88B788]"} />
                    <PromoCard icon={"/assets/img/image43.png"} color={"bg-[#F5C361]"} />
                </div>
            </div>

            {/* content  */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 mt-16 pb-20">
                <div className="mb-10">
                    <h2 className="text-4xl mb-4 font-bold">Our <span className="text-orange-900">Product</span></h2>
                    <button className="bg-black text-white p-3 rounded-xl w-full md:hidden font-bold">Show Filter</button>
                </div>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* filter product  */}
                    <aside className="w-full md:w-[320px] bg-black text-white p-8 rounded-3xl h-fit sticky top-10 flex flex-col gap-6">
                        <div className="flex justify-between items-center border-b border-white/10 pb-4">
                            <h2 className="text-xl font-bold tracking-wide">Filter</h2>
                            <button
                                onClick={handleReset}
                                className="text-xs text-orange-400 hover:text-orange-300 transition-colors cursor-pointer">Reset Filter</button>
                        </div>

                        <div className="flex flex-col items-start">
                            <label htmlFor="search" className="text-sm font-semibold text-gray-400 mb-2">Search</label>
                            <input
                                type="text"
                                id="search"
                                placeholder="Search Your Product"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="bg-white/10 text-white placeholder:text-gray-500 h-11 px-4 rounded-xl w-full border border-white/5 outline-none focus:ring-2 focus:ring-orange-500" />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-400 mb-4 block">Category</label>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="fav"
                                        className="w-5 h-5 accent-orange-500 rounded cursor-pointer"
                                        // checked={favorite}
                                        // onChange={() => setFavorite(!favorite)}
                                    /> 
                                    <label htmlFor="fav" className="text-gray-300 cursor-pointer">Favorite Product</label>
                                </li>
                                <li className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="coffee"
                                        checked={categories.includes("coffee")}
                                        onChange={() => handleCategoryChange("coffee")}
                                        className="w-5 h-5 accent-orange-500 rounded cursor-pointer"
                                    /> 
                                    <label htmlFor="coffee" className="text-gray-300 cursor-pointer">Coffee</label>
                                </li>
                                <li className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="noncoffee"
                                        checked={categories.includes("non coffee")}
                                        onChange={() => handleCategoryChange("non coffee")}
                                        className="w-5 h-5 accent-orange-500 rounded cursor-pointer"
                                    /> 
                                    <label htmlFor="noncoffee" className="text-gray-300 cursor-pointer">Non Coffee</label>
                                </li>
                                <li className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="foods"
                                        checked={categories.includes("food")}
                                        onChange={() => handleCategoryChange("food")}
                                        className="w-5 h-5 accent-orange-500 rounded cursor-pointer"
                                    /> 
                                    <label htmlFor="foods" className="text-gray-300 cursor-pointer">Foods</label>
                                </li>
                                <li className="flex items-center gap-3">
                                    <input type="checkbox" id="addon" className="w-5 h-5 accent-orange-500 rounded cursor-pointer" /> 
                                    <label htmlFor="addon" className="text-gray-300 cursor-pointer">Add-On</label>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-400 mb-4 block">Sort By</label>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <input type="radio" name="sort" id="bogo" className="w-5 h-5 accent-orange-500 cursor-pointer" /> 
                                    <label htmlFor="bogo" className="text-gray-300 cursor-pointer">Buy 1 Get 1</label>
                                </li>
                                <li className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="sort"
                                        id="flash"
                                        className="w-5 h-5 accent-orange-500 cursor-pointer"
                                        // checked={sort === "flashSale"}
                                        // onChange={() => setSort("flashSale")}
                                    /> 
                                    <label htmlFor="flash" className="text-gray-300 cursor-pointer">Flash Sale</label>
                                </li>
                                <li className="flex items-center gap-3">
                                    <input type="radio" name="sort" id="birthday" className="w-5 h-5 accent-orange-500 cursor-pointer" /> 
                                    <label htmlFor="birthday" className="text-gray-300 cursor-pointer">Birthday Package</label>
                                </li>
                                <li className="flex items-center gap-3">
                                    <input 
                                        type="radio" 
                                        name="sort" 
                                        id="cheap" 
                                        checked={sort === "cheap"}
                                        onChange={() => setSort("cheap")}
                                        className="w-5 h-5 accent-orange-500 cursor-pointer" /> 
                                    <label htmlFor="cheap" className="text-gray-300 cursor-pointer">Cheap</label>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-3 my-2">
                            <div className="flex justify-between text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                <span>Range Price</span>
                                <span>IDR 100k</span>
                            </div>
                            <input type="range" min="0" max="100" className="accent-orange-500" />
                        </div>

                        <button
                            onClick={handleApplyFilter}
                            className="bg-[#FF8906] hover:bg-orange-600 transition-all w-full h-12 text-black font-bold rounded-xl mt-4 cursor-pointer active:scale-95 shadow-lg shadow-orange-500/20"
                        >
                            Apply Filter
                        </button>
                    </aside>

                    <div className="flex-1">
                        <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-x-10 gap-y-32 mb-40">
                            {currentProducts.map((product) => (
                                <Product key={product.product_id} product={product} />
                            ))}
                        </div>

                        <div className="flex justify-center md:justify-center my-5">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}