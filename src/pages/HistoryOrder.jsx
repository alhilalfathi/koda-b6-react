import { Footer } from "../component/Footer"
import { NavDiv } from "../component/NavDiv"
import { Pagination } from "../component/Pagination"
import { LuCalendarDays } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"
import { useState, useEffect } from "react";
import http from "../lib/http"

// ================= COMPONENT ITEM =================
const HistoryProduct = ({ order }) => {
    const firstItem = order.items?.[0]
    const otherItemsCount = (order.items?.length || 0) - 1

    return (
        <div className="flex gap-5 my-5 bg-[#E8E8E8] p-3">

            {/* IMAGE */}
            <img
                src={
                    firstItem?.product_image
                        ? `https://hilal-backend.camps.fahrul.id/${firstItem.product_image}`
                        : "/assets/img/default-product.png"
                }
                className="w-24 h-24 object-cover"
            />

            {/* ORDER NUMBER */}
            <div className="flex flex-col items-center">
                <span className="flex gap-3 items-center">
                    <img src="/assets/img/order.png" /> No. Order
                </span>
                <p className="font-bold">{order.trx_id}</p>
                <Link to={`/detail-order/${order.trx_id}`}>
                    Views Order Detail
                </Link>
            </div>

            {/* DATE */}
            <div className="flex flex-col items-center">
                <span className="flex gap-3 items-center">
                    <img src="/assets/img/Calendar.png" /> Date
                </span>
                <p className="font-bold">
                    {new Date(order.order_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                    })}
                </p>
            </div>

            {/* TOTAL */}
            <div className="flex flex-col items-center">
                <span className="flex gap-3 items-center">
                    <img src="/assets/img/Repeat.png" /> Total
                </span>
                <p className="font-bold">
                    IDR {order.total?.toLocaleString()}
                </p>

                {otherItemsCount > 0 && (
                    <p className="text-sm text-gray-500">
                        + {otherItemsCount} other items
                    </p>
                )}
            </div>

            {/* STATUS */}
            <div className="flex flex-col items-center">
                <span className="flex gap-3 items-center">
                    <img src="/assets/img/u_process.png" /> Status
                </span>

                <p className="bg-orange-300 py-3 px-2 rounded-2xl capitalize">
                    {order.status_order}
                </p>
            </div>
        </div>
    )
}

// ================= MAIN PAGE =================
export const HistoryOrder = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 3

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    const currentUser = useSelector((state) => state.auth.user)

    // ================= FETCH DATA =================
    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            setLoading(true)

            const res = await http("/admin/transaction/user")

            if (!res.success) {
                alert(res.message)
                return
            }

            setOrders(res.results || [])

        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    // ================= PAGINATION =================
    const totalPages = Math.ceil(orders.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentOrders = orders.slice(startIndex, endIndex)

    // ================= NOT LOGIN =================
    if (!currentUser) {
        return (
            <div>
                <NavDiv />
                <p className="text-center mt-20">You need to login</p>
                <Footer />
            </div>
        )
    }

    return (
        <div>
            <NavDiv />

            <div>
                {/* TITLE */}
                <div className="flex gap-5 items-center ml-20 mt-10 mb-5">
                    <h1 className="text-4xl py-3">History Order</h1>
                    <span className="bg-[#E8E8E8] px-2 mt-3">
                        {orders.length}
                    </span>
                </div>

                <div className="flex gap-5 mx-20">

                    {/* LEFT CONTENT */}
                    <div className="w-[60%]">

                        {/* FILTER + DATE */}
                        <div className="flex gap-10 mb-10 justify-between">

                            <div className="flex gap-5 bg-[#E8E8E8] px-5 py-3">
                                <p className="bg-white p-2">On Progress</p>
                                <p>Shipping</p>
                                <p>Done</p>
                            </div>

                            <div className="flex items-center bg-[#E8E8E8] p-5">
                                <LuCalendarDays />
                                <select>
                                    <option>January 2023</option>
                                    <option>February 2023</option>
                                </select>
                            </div>
                        </div>

                        {/* LIST */}
                        {loading ? (
                            <p>Loading...</p>
                        ) : orders.length === 0 ? (
                            <p>No Order History</p>
                        ) : (
                            currentOrders.map((order) => (
                                <HistoryProduct
                                    key={order.trx_id}
                                    order={order}
                                />
                            ))
                        )}
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <aside className="w-[40%] border border-[#E8E8E8] p-5">
                        <img src="/assets/img/message.png" />
                        <h3 className="font-bold mt-2 mb-3">
                            Send Us Message
                        </h3>
                        <p>
                            If you can't find your order, contact us.
                        </p>
                        <div className="bg-[#FF8906] px-5 py-3 w-full rounded my-5 text-center">
                            Send Message
                        </div>
                    </aside>
                </div>
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center mt-5 mb-10">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>

            <Footer />
        </div>
    )
}