import productImage from "../assets/img/image27.png"
import addIcon from "../assets/img/plus.png"
import filterIcon from "../assets/img/Filter3.png"
import editIcon from "../assets/img/Group-1707.png"
import deleteIcon from "../assets/img/Group-1706.png"
import { IoCloseCircleSharp } from "react-icons/io5";

export const AdminProduct = () => {
  return (
    <div className="py-10 relative">
        <div className="mr-15">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-semibold">Product List</h1>
                    <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
                        <img src={addIcon} alt="add icon" className="md:w-4 w-2 md:h-4 h-2"/>
                        Add Product
                    </button>
                </div>
                <div className="flex items-center gap-3">
                    <div className=" flex flex-col">
                        <label for="product-name">Search Product</label>
                            <input id="product-name" type="text" placeholder="Enter Product Name"
                            className="border rounded-lg pl-10 pr-4 py-2 w-64 text-sm"/>
                    </div>
                    <button className="bg-orange-500 text-white mt-6 px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
                        <img src={filterIcon} alt="filter icon" className="w-4 h-4"/>
                        Filter
                    </button>
                </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="p-4"><input type="checkbox"/></th>
                            <th className="p-4">Image</th>
                            <th className="p-4 text-left">Product Name</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Desc</th>
                            <th className="p-4">Product Size</th>
                            <th className="p-4">Method</th>
                            <th className="p-4">Stock</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        <tr>
                            <td className="p-4"><input type="checkbox"/></td>
                            <td className="p-4">
                                <img src={productImage} className="w-12 h-12 rounded object-cover"/>
                            </td>
                            <td className="p-4">Caramel Macchiato</td>
                            <td className="p-4">IDR 40.000</td>
                            <td className="p-4 text-gray-500">Coldbrewing is a method of brewing that...</td>
                            <td className="p-4">R,L,XL,250gr</td>
                            <td className="p-4">Deliver, Dine In</td>
                            <td className="p-4">200</td>
                            <td className="p-4">
                            <div className="flex gap-2 justify-center">
                                <button className="cursor-pointer">
                                    <img src={editIcon}/>
                                </button>
                                <button className="cursor-pointer">
                                    <img src={deleteIcon}/>
                                </button>
                            </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-between items-center p-4 text-sm text-gray-500">
                    <span>Show 5 product of 100 product</span>
                    <div className="flex items-center gap-2">
                        <button>Prev</button>
                        <button className="text-orange-500 font-semibold">1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>4</button>
                        <button>5</button>
                        <button>6</button>
                        <button>7</button>
                        <button>8</button>
                        <button>9</button>
                        <button>Next</button>
                    </div>
                </div>
            </div>
        </div>
        {/* insert product  default hidden  */}
        <div className="absolute top-0 right-0 w-271 bg-black/40 min-h-screen hidden">
            <div className="absolute top-0 right-0 w-100 min-h-screen border p-5 bg-white">
                <span className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Add Product</h1>
                    <IoCloseCircleSharp />
                </span>
                <label className="block text-sm mb-2">Photo Product</label>
                <div className="w-12 h-12 border rounded-lg flex items-center justify-center mb-3">
                    <img src="https://placehold.co/50x50" alt="product image" className="w-6"/>
                </div>
                <button className="bg-orange-500 text-white px-4 py-2 rounded text-sm mb-6">
                    Upload
                </button>

                <label for="productName" className="block text-sm mb-1">Product name</label>
                <input id="productName" className="w-full border rounded-lg px-4 py-2 mb-4" placeholder="Enter Product Name"/>

                <label for="productPrice" className="block text-sm mb-1">Price</label>
                <input id="productPrice" className="w-full border rounded-lg px-4 py-2 mb-4" placeholder="Enter Product Price"/>

            
                <label for="description" className="block text-sm mb-1">Description</label>
                <textarea id="description" className="w-full border rounded-lg px-4 py-2 h-28 mb-4" placeholder="Enter Product Description">
                </textarea>

                <label className="block text-sm mb-2">Product Size</label>
                <div className="flex gap-2 mb-4">
                    <button className="border px-4 py-2 rounded">R</button>
                    <button className="border px-4 py-2 rounded">L</button>
                    <button className="border px-4 py-2 rounded">XL</button>
                    <button className="border px-4 py-2 rounded">250 gr</button>
                    <button className="border px-4 py-2 rounded">500 gr</button>
                </div>
            
                <label className="block text-sm mb-1">Stock</label>
                <select className="w-full border rounded-lg px-4 py-2 mb-6">
                    <option>Enter Product Stock</option>
                </select>

                <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold">
                    Save Product
                </button>
            </div>
        </div>
    </div>
  )
}
