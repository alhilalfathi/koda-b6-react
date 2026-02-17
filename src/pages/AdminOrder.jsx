import addIcon from "/assets/img/plus.png"
import filterIcon from "/assets/img/Filter3.png"
import productImage from "/assets/img/image31.png"
import productImage2 from "/assets/img/image32.png"
import { BiDetail, BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useRef } from "react";
import { useSelector } from "react-redux"
import { useMemo, useState } from "react"


export const AdminOrder = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const allOrders = useSelector((state) => state.cart.orders)

  const orders = useMemo(() => {
    if (!allOrders) return []

    return Object.values(allOrders).flat()
  }, [allOrders])


  const itemsPerPage = 4
  const totalPages = Math.ceil(orders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentOrders = orders.slice(startIndex, endIndex)


  const infoRef = useRef()
  const showInfo = () => {
    infoRef.current.classList.remove("hidden")
  }
  const hideInfo = () => {
    infoRef.current.classList.add("hidden")
  }
  return (
    <div className="py-10 relative">
      <div className="mr-15">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Order List</h1>
            <button onClick={showInfo} className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
              <img src={addIcon} alt="add icon" className="md:w-4 w-2 md:h-4 h-2" />
              Add Order
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className=" flex flex-col">
              <label htmlFor="product-name">Status</label>
              <select id="order-status" type="text"
                className="border rounded-lg pl-4 pr-4 py-2 w-64 text-sm">
                <option value="All">All</option>
                <option value="done">Done</option>
                <option value="pending">Pending</option>
                <option value="on-progress">On Progress</option>
                <option value="wait">Wait</option>
              </select>
            </div>
            <div className=" flex flex-col">
              <label htmlFor="product-name">Search Order</label>
              <input id="product-name" type="text" placeholder="Enter Order Number"
                className="border rounded-lg pl-10 pr-4 py-2 w-64 text-sm" />
            </div>
            <button className="bg-orange-500 text-white mt-6 px-4 py-2 rounded-lg flex items-center gap-2">
              <img src={filterIcon} alt="filter icon" className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-4"><input type="checkbox" /></th>
                <th className="p-4">No Order</th>
                <th className="p-4">Date</th>
                <th className="p-4">Order</th>
                <th className="p-4">Status</th>
                <th className="p-4">Total</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {currentOrders.map(order => (
                <tr key={order.id}>
                  <td className="p-4"><input type="checkbox" /></td>
                  <td className="p-4">#{order.id}</td>
                  <td className="p-4">
                    {new Date(order.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className="p-4">
                    <ul>
                      {order.cartItems.map((item, index) => (
                        <li key={index}>
                          {item.name} {item.quantity}x
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4">
                    <span className="bg-green-200 p-2 rounded-2xl">Done</span>
                  </td>
                  <td className="p-4">
                    IDR {order.subTotal.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      <button><BiDetail /></button>
                      <button><BiEdit /></button>
                      <button><MdDelete /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center p-4 text-sm text-gray-500">
            <span>
              Show {currentOrders.length} order of {orders.length} orders
            </span>
            <div className="flex items-center gap-2">
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
                  className={currentPage === i + 1 ? "text-orange-500 font-semibold" : ""}
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
      {/* order information  default hidden  */}
      <div ref={infoRef} className="absolute top-0 right-0 w-271 bg-black/40 min-h-screen hidden">
        <div className="absolute top-0 right-0 w-100 min-h-screen border p-5 bg-white">
          <span className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Order  #12354-09893</h1>
            <IoCloseCircleSharp onClick={hideInfo} className="cursor-pointer" />
          </span>
          <label htmlFor="productName" className="block text-sm mb-1">Order Information</label>

          <div className="flex justify-between py-4 border border-white border-b-[#E8E8E84D]">
            <p>Full Name</p>
            <h2>Ghaluh Wizard Anggoro</h2>
          </div>
          <div className="flex justify-between py-4 border border-white border-b-[#E8E8E84D]">
            <p>Address</p>
            <h2>Griya bandung indah</h2>
          </div>
          <div className="flex justify-between py-4 border border-white border-b-[#E8E8E84D]">
            <p>Phone</p>
            <h2>082116304338</h2>
          </div>
          <div className="flex justify-between py-4 border border-white border-b-[#E8E8E84D]">
            <p>Payment Method</p>
            <h2>Cash</h2>
          </div>
          <div className="flex justify-between py-4 border border-white border-b-[#E8E8E84D]">
            <p>Shipping</p>
            <h2>Dine In</h2>
          </div>
          <div className="flex justify-between py-4 border border-white border-b-[#E8E8E84D]">
            <p>Status</p>
            <div className="bg-[#E8E8E84D] rounded-xl p-3">
              <select name="status" id="status">
                <option value="done">Done</option>
                <option value="pending">Pending</option>
                <option value="on-progress">On Progress</option>
                <option value="wait">Wait</option>
              </select>
            </div>
          </div>

          <p>Your Order</p>
          <div>
            <div className="flex bg-gray-100 items-center gap-4  my-4 px-3">
              <img src={productImage} alt="product image" className="w-16 h-16" />
              <div className="flex flex-col py-1">
                <span className="bg-red-600 rounded-xl px-1 text-white text-sm w-20 flex justify-center ">Flash Sale!</span>
                <h3 className="font-bold">Hazelnut Latte</h3>
                <p>2pcs   |   Regular   |   Ice   |   Dine In</p>
                <div className="flex gap-3">
                  <span className="text-red-500"><del>IDR 20.000</del></span>
                  <span className="text-orange-500">IDR10.000</span>
                </div>
              </div>
            </div>
            <div className="flex bg-gray-100 items-center gap-4 my-4 px-3">
              <img src={productImage2} alt="product image" className="w-16 h-16" />
              <div className="flex flex-col py-1">
                <span className="bg-red-600 rounded-xl px-1 text-white text-sm w-20 flex justify-center ">Flash Sale!</span>
                <h3 className="font-bold">Hazelnut Latte</h3>
                <p>2pcs   |   Regular   |   Ice   |   Dine In</p>
                <div className="flex gap-3">
                  <span className="text-red-500"><del>IDR 20.000</del></span>
                  <span className="text-orange-500">IDR10.000</span>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold">
            Update
          </button>
        </div>
      </div>
    </div>
  )
}
