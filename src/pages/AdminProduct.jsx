import productImage from "/assets/img/image27.png"
import addIcon from "/assets/img/plus.png"
import filterIcon from "/assets/img/Filter3.png"
import editIcon from "/assets/img/Group-1707.png"
import deleteIcon from "/assets/img/Group-1706.png"
import { IoCloseCircleSharp } from "react-icons/io5";
import { useRef, useEffect, useState, useMemo } from "react"
import http from "../lib/http"

export const AdminProduct = () => {

    // ================= STATE =================
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState("")
    const [searchInput, setSearchInput] = useState("")

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 4

    // ================= FETCH DATA =================
    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            setLoading(true)

            const res = await http("/admin/products/")

            if (!res.success) return

            // mapping backend → frontend
            const mapped = res.results.map(p => ({
                id: p.product_id,
                name: p.product_name,
                tag: p.product_desc,
                price: p.price,
                stock: p.stock,
                img: p.path
                    ? p.path
                    : productImage
            }))

            setProducts(mapped)

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    // ================= SEARCH =================
    const filteredProducts = useMemo(() => {
        return products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
    }, [products, search])

    // ================= PAGINATION =================
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentProducts = filteredProducts.slice(startIndex, endIndex)

    // ================= MODAL =================
    const insertRef = useRef()

    const insertProduct = () => {
        insertRef.current.classList.remove("hidden")
    }

    const closeInsert = () => {
        insertRef.current.classList.add("hidden")
    }

    const filterButton = () => {
        setSearch(searchInput)
        setCurrentPage(1)
    }

    // ================= DELETE =================
    const handleDelete = async (id) => {
        if (!confirm("Delete this product?")) return

        try {
            const res = await http(`/admin/products/${id}`, {
                method: "DELETE"
            })

            if (!res.success) {
                alert(res.message)
                return
            }

            alert("Delete success")
            fetchProducts()

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="py-10 relative">

            <div className="mr-15">

                {/* ================= HEADER ================= */}
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

                    <div className="flex items-center gap-3">
                        <div>
                            <label>Search Product</label>
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="border rounded-lg px-4 py-2 w-64 text-sm"
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
                                <th className="p-4"></th>
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
                                    <td colSpan="7" className="text-center p-5">
                                        Loading...
                                    </td>
                                </tr>
                            ) : currentProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center p-5">
                                        No Product Found
                                    </td>
                                </tr>
                            ) : (
                                currentProducts.map(product => (
                                    <tr key={product.id}>
                                        <td className="p-4"></td>

                                        <td className="p-4">
                                            <img
                                                src={product.img}
                                                className="w-12 h-12 rounded object-cover"
                                            />
                                        </td>

                                        <td className="p-4">{product.name}</td>

                                        <td className="p-4">
                                            IDR {product.price?.toLocaleString()}
                                        </td>

                                        <td className="p-4 text-gray-500">
                                            {product.tag}
                                        </td>

                                        <td className="p-4">{product.stock}</td>

                                        <td className="p-4">
                                            <div className="flex gap-2 justify-center">

                                                {/* EDIT */}
                                                <button>
                                                    <img src={editIcon} />
                                                </button>

                                                {/* DELETE */}
                                                <button onClick={() => handleDelete(product.id)}>
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
                                onClick={() => setCurrentPage(p => p - 1)}
                            >
                                Prev
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={currentPage === i + 1 ? "text-orange-500" : ""}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(p => p + 1)}
                            >
                                Next
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            {/* ================= MODAL ================= */}
            <div ref={insertRef} className="hidden absolute top-0 right-0 w-full bg-black/40 min-h-screen">

                <div className="absolute top-0 right-0 w-96 min-h-screen p-5 bg-white">

                    <div className="flex justify-between">
                        <h1 className="text-xl font-bold">Add Product</h1>
                        <IoCloseCircleSharp onClick={closeInsert} />
                    </div>

                    <p className="text-sm mt-4 text-gray-500">
                        Form create product belum di-integrasikan
                    </p>

                </div>
            </div>
        </div>
    )
}