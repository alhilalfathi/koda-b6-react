import productImage from "/assets/img/image27.png"
import addIcon from "/assets/img/plus.png"
import filterIcon from "/assets/img/Filter3.png"
import editIcon from "/assets/img/Group-1707.png"
import deleteIcon from "/assets/img/Group-1706.png"
import { IoCloseCircleSharp } from "react-icons/io5";
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
    const itemsPerPage = 4

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
    }

    const closeInsert = () => {
        insertRef.current.classList.add("hidden")
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
            // VALIDASI
            if (!form.product_name || !form.price) {
                alert("Product name & price required")
                return
            }

            // === CREATE PRODUCT ===
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

            // === UPLOAD IMAGE ===
            if (imageFile) {
                const formData = new FormData()
                formData.append("image", imageFile)

                const token = localStorage.getItem("token")

                await fetch(
                    `https://hilal-backend.camps.fahrul.id/admin/products/${productId}/image`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: "Bearer " + token
                        },
                        body: formData
                    }
                )
            }

            alert("Product created")

            // reset form
            setForm({
                product_name: "",
                product_desc: "",
                price: "",
                stock: ""
            })
            setImageFile(null)

            closeInsert()

            // reload data
            window.location.reload()

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="py-10 relative">

            {/* ================= HEADER ================= */}
            <div className="mr-15">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold">Product List</h1>

                        <button
                            onClick={insertProduct}
                            className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            <img src={addIcon} className="w-4 h-4" />
                            Add Product
                        </button>
                    </div>

                    {/* SEARCH */}
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                            <label>Search Product</label>
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="border rounded-lg pl-4 pr-4 py-2 w-64 text-sm"
                            />
                        </div>

                        <button
                            onClick={filterButton}
                            className="bg-orange-500 text-white mt-6 px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            <img src={filterIcon} className="w-4 h-4" />
                            Filter
                        </button>
                    </div>
                </div>

                {/* ================= TABLE ================= */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="p-4">Image</th>
                                <th className="p-4 text-left">Product Name</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Desc</th>
                                <th className="p-4">Stock</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center p-5">
                                        Loading...
                                    </td>
                                </tr>
                            ) : currentProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center p-5">
                                        No Product Found
                                    </td>
                                </tr>
                            ) : (
                                currentProducts.map(product => (
                                    <tr key={product.product_id}>
                                        <td className="p-4">
                                            <img
                                                src={
                                                    product.path
                                                        ? product.path
                                                        : productImage
                                                }
                                                className="w-12 h-12 rounded object-cover"
                                            />
                                        </td>

                                        <td className="p-4">{product.product_name}</td>

                                        <td className="p-4">
                                            IDR {product.price?.toLocaleString()}
                                        </td>

                                        <td className="p-4 text-gray-500">
                                            {product.product_desc}
                                        </td>

                                        <td className="p-4">{product.stock}</td>

                                        <td className="p-4">
                                            <div className="flex gap-2 justify-center">
                                                <button>
                                                    <img src={editIcon} />
                                                </button>
                                                <button>
                                                    <img src={deleteIcon} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* ================= PAGINATION ================= */}
                    <div className="flex justify-between items-center p-4 text-sm text-gray-500">
                        <span>
                            Show {currentProducts.length} of {filteredProducts.length}
                        </span>

                        <div className="flex gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                            >
                                Prev
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={currentPage === i + 1 ? "text-orange-500 font-bold" : ""}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= MODAL ADD PRODUCT ================= */}
            <div ref={insertRef} className="absolute top-0 right-0 w-full bg-black/40 min-h-screen hidden">
                <div className="absolute top-0 right-0 w-96 min-h-screen bg-white p-5">

                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-bold">Add Product</h1>
                        <IoCloseCircleSharp onClick={closeInsert} className="cursor-pointer" />
                    </div>

                    {/* IMAGE */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="mb-4"
                    />

                    {/* NAME */}
                    <input
                        id="product_name"
                        value={form.product_name}
                        onChange={handleChange}
                        placeholder="Product Name"
                        className="w-full border rounded-lg px-4 py-2 mb-4"
                    />

                    {/* PRICE */}
                    <input
                        id="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="w-full border rounded-lg px-4 py-2 mb-4"
                    />

                    {/* DESC */}
                    <textarea
                        id="product_desc"
                        value={form.product_desc}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full border rounded-lg px-4 py-2 h-24 mb-4"
                    />

                    {/* STOCK */}
                    <input
                        id="stock"
                        value={form.stock}
                        onChange={handleChange}
                        placeholder="Stock"
                        className="w-full border rounded-lg px-4 py-2 mb-4"
                    />

                    {/* SAVE */}
                    <button
                        onClick={handleCreateProduct}
                        className="w-full bg-orange-500 text-white py-3 rounded-lg"
                    >
                        Save Product
                    </button>
                </div>
            </div>
        </div>
    )
}