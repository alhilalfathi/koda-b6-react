import productImage from "/assets/img/image27.png"
import addIcon from "/assets/img/plus.png"
import filterIcon from "/assets/img/Filter3.png"
import editIcon from "/assets/img/Group-1707.png"
import deleteIcon from "/assets/img/Group-1706.png"
import { IoClose } from "react-icons/io5"
import { useRef, useContext, useState, useMemo } from "react"
import { DataContext } from "../component/context/DataContext"
import http from "../lib/http"

export const AdminProduct = () => {

    const { products, loading } = useContext(DataContext)

    // ================= SEARCH =================
    const [search, setSearch] = useState("")
    const [searchInput, setSearchInput] = useState("")

    // ================= PAGINATION =================
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5 // Ditingkatkan sedikit agar proporsional

    // ================= FORM STATE (CREATE PRODUCT) =================
    const [form, setForm] = useState({
        product_name: "",
        product_desc: "",
        price: "",
        stock: ""
    })

    const [imageFile, setImageFile] = useState(null)

    // ================= FILTER =================
    const filteredProducts = useMemo(() => {
        return products.filter(product =>
            product.product_name?.toLowerCase().includes(search.toLowerCase())
        )
    }, [products, search])

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

    // ================= MODAL =================
    const insertRef = useRef()

    const insertProduct = () => {
        insertRef.current.classList.remove("hidden")
        insertRef.current.classList.add("flex")
    }

    const closeInsert = () => {
        insertRef.current.classList.add("hidden")
        insertRef.current.classList.remove("flex")
    }

    // ================= HANDLE INPUT =================
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    }

    // ================= FILTER BUTTON =================
    const filterButton = () => {
        setSearch(searchInput)
        setCurrentPage(1)
    }

    // ================= CREATE PRODUCT =================
    const handleCreateProduct = async () => {
        try {
            if (!form.product_name || !form.price) {
                alert("Product name & price required")
                return
            }

            const res = await http("/admin/products", {
                method: "POST",
                body: {
                    product_name: form.product_name,
                    product_desc: form.product_desc,
                    price: Number(form.price),
                    stock: Number(form.stock)
                }
            })

            if (!res.success) {
                alert(res.message)
                return
            }

            const productId = res.results?.product_id

            if (imageFile) {
                const formData = new FormData()
                formData.append("image", imageFile)
                const token = localStorage.getItem("token")

                await fetch(
                    `https://hilal-backend.camps.fahrul.id/admin/products/${productId}/image`,
                    {
                        method: "POST",
                        headers: { Authorization: "Bearer " + token },
                        body: formData
                    }
                )
            }

            alert("Product created successfully")
            setForm({ product_name: "", product_desc: "", price: "", stock: "" })
            setImageFile(null)
            closeInsert()
            window.location.reload()

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="p-6 lg:p-10 bg-gray-50 min-h-screen">

            {/* ================= HEADER ================= */}
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Product List</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage your coffee products and stock</p>
                        
                        <button
                            onClick={insertProduct}
                            className="mt-5 bg-orange-500 hover:bg-orange-600 transition-colors text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-orange-200 font-medium"
                        >
                            <img src={addIcon} className="w-4 h-4" alt="add" />
                            Add New Product
                        </button>
                    </div>

                    {/* SEARCH BOX */}
                    <div className="flex items-end gap-3 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Search Product</label>
                            <input
                                type="text"
                                placeholder="Type product name..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="bg-gray-50 border-none focus:ring-2 focus:ring-orange-500 rounded-lg px-4 py-2 w-full md:w-64 text-sm"
                            />
                        </div>

                        <button
                            onClick={filterButton}
                            className="bg-gray-800 hover:bg-black transition-colors text-white px-5 py-2.5 rounded-lg flex items-center gap-2"
                        >
                            <img src={filterIcon} className="w-4 h-4" alt="filter" />
                            Filter
                        </button>
                    </div>
                </div>

                {/* ================= TABLE ================= */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-400 uppercase text-xs tracking-widest border-b">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-center w-24">Image</th>
                                <th className="px-6 py-4 font-semibold">Product Info</th>
                                <th className="px-6 py-4 font-semibold">Price</th>
                                <th className="px-6 py-4 font-semibold">Stock</th>
                                <th className="px-6 py-4 font-semibold text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="5" className="text-center py-10 text-gray-400">Loading data...</td></tr>
                            ) : currentProducts.length === 0 ? (
                                <tr><td colSpan="5" className="text-center py-10 text-gray-400">No products found.</td></tr>
                            ) : (
                                currentProducts.map(product => (
                                    <tr key={product.product_id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <img
                                                src={product.path || productImage}
                                                className="w-14 h-14 rounded-2xl object-cover shadow-sm mx-auto"
                                                alt="product"
                                            />
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-800 text-base">{product.product_name}</div>
                                            <div className="text-gray-400 text-xs line-clamp-1 max-w-xs">{product.product_desc}</div>
                                        </td>

                                        <td className="px-6 py-4 font-semibold text-orange-600">
                                            IDR {product.price?.toLocaleString()}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.stock > 10 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                                {product.stock} pcs
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex gap-3 justify-center">
                                                <button className="hover:scale-110 transition-transform"><img src={editIcon} alt="edit" className="w-8 h-8" /></button>
                                                <button className="hover:scale-110 transition-transform"><img src={deleteIcon} alt="delete" className="w-8 h-8" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* ================= PAGINATION ================= */}
                    <div className="flex justify-between items-center px-8 py-5 bg-gray-50/50 border-t border-gray-100 text-sm">
                        <span className="text-gray-400">
                            Showing <span className="font-bold text-gray-700">{currentProducts.length}</span> of {filteredProducts.length}
                        </span>

                        <div className="flex items-center gap-1">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                className="px-3 py-1.5 rounded-lg hover:bg-white hover:shadow-sm disabled:opacity-30 transition-all"
                            >
                                Prev
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-8 h-8 rounded-lg transition-all ${currentPage === i + 1 ? "bg-orange-500 text-white font-bold shadow-md shadow-orange-200" : "text-gray-400 hover:bg-white"}`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                className="px-3 py-1.5 rounded-lg hover:bg-white hover:shadow-sm disabled:opacity-30 transition-all"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= MODAL ADD PRODUCT ================= */}
            <div ref={insertRef} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden justify-end transition-opacity">
                <div className="w-full max-w-md bg-white h-screen shadow-2xl flex flex-col animate-slide-left">
                    
                    {/* MODAL HEADER */}
                    <div className="p-6 border-b flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Add New Product</h2>
                            <p className="text-xs text-gray-400">Fill in the details below</p>
                        </div>
                        <button onClick={closeInsert} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                            <IoClose size={24} />
                        </button>
                    </div>

                    {/* MODAL BODY */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-5">
                        
                        {/* IMAGE UPLOAD UI */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Product Image</label>
                            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-4 text-center hover:border-orange-400 transition-colors cursor-pointer relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                {imageFile ? (
                                    <p className="text-orange-500 font-medium text-sm">{imageFile.name}</p>
                                ) : (
                                    <div className="text-gray-400">
                                        <p className="text-sm">Click or drag image to upload</p>
                                        <p className="text-xs mt-1 italic text-gray-300">PNG, JPG up to 2MB</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* INPUT FIELDS */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="product_name" className="text-sm font-bold text-gray-700">Product Name</label>
                            <input
                                id="product_name"
                                value={form.product_name}
                                onChange={handleChange}
                                placeholder="e.g. Caramel Macchiato"
                                className="w-full bg-gray-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-orange-500 rounded-xl px-4 py-3 text-sm transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="price" className="text-sm font-bold text-gray-700">Price (IDR)</label>
                                <input
                                    id="price"
                                    type="number"
                                    value={form.price}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="w-full bg-gray-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-orange-500 rounded-xl px-4 py-3 text-sm transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="stock" className="text-sm font-bold text-gray-700">Initial Stock</label>
                                <input
                                    id="stock"
                                    type="number"
                                    value={form.stock}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="w-full bg-gray-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-orange-500 rounded-xl px-4 py-3 text-sm transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="product_desc" className="text-sm font-bold text-gray-700">Description</label>
                            <textarea
                                id="product_desc"
                                value={form.product_desc}
                                onChange={handleChange}
                                placeholder="Tell us more about this product..."
                                className="w-full bg-gray-50 border-gray-100 focus:bg-white focus:ring-2 focus:ring-orange-500 rounded-xl px-4 py-3 h-32 text-sm transition-all resize-none"
                            />
                        </div>
                    </div>

                    {/* MODAL FOOTER */}
                    <div className="p-6 border-t bg-gray-50">
                        <button
                            onClick={handleCreateProduct}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-95"
                        >
                            Confirm & Save Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}