import productImage from "../assets/img/image27.png"
import addIcon from "../assets/img/plus.png"
import filterIcon from "../assets/img/Filter3.png"
import editIcon from "../assets/img/Group-1707.png"
import deleteIcon from "../assets/img/Group-1706.png"

export const AdminProduct = () => {
  return (
    <div className="mr-15 py-10">
        <div className="flex justify-between items-center mb-6">
            <div>
                <h1 className="text-2xl font-semibold">Product List</h1>
                <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <img src={addIcon} alt="add icon" className="md:w-4 w-2 md:h-4 h-2"/>
                    Add Product
                </button>
            </div>

            <div className="flex items-center gap-3">
                <div className=" flex flex-col">
                    <label for="product-name">Search Order</label>
                        <input id="product-name" type="text" placeholder="Enter Product Name"
                        className="border rounded-lg pl-10 pr-4 py-2 w-64 text-sm"/>
                </div>

                <button className="bg-orange-500 text-white mt-6 px-4 py-2 rounded-lg flex items-center gap-2">
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
                            <button>
                                <img src={editIcon}/>
                            </button>
                            <button>
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
  )
}
