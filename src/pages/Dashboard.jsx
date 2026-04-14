import { useEffect, useState } from "react"
import http from "../lib/http"
import graphImage from "/assets/img/graph.png"

export const Dashboard = () => {

    const [summary, setSummary] = useState({
        progress: 0,
        shipping: 0,
        done: 0
    })

    const [topProducts, setTopProducts] = useState([])

    // FETCH DASHBOARD
    useEffect(() => {
        fetchDashboard()
    }, [])

    const fetchDashboard = async () => {
        try {
            // GET TRANSACTION DATA
            const trxRes = await http("/admin/transaction/")

            if (trxRes.success) {
                const trx = trxRes.results || []

                const progress = trx.filter(
                    t => t.status_order?.toLowerCase() === "process"
                ).length

                const shipping = trx.filter(
                    t => t.status_order?.toLowerCase() === "shipping"
                ).length

                const done = trx.filter(
                    t => t.status_order?.toLowerCase() === "done"
                ).length

                setSummary({ progress, shipping, done })
            }

            // GET MOST SELLED PRODUCT
            const productRes = await http("/recommended-products")

            if (productRes.success) {
                setTopProducts(productRes.results || [])
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50">

            {/* SUMMARY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">

                <Card
                    color="bg-emerald-500"
                    title="Order On Progress"
                    value={summary.progress}
                    icon="/assets/img/cup-ellipse.png"
                />

                <Card
                    color="bg-indigo-500"
                    title="Order Shipping"
                    value={summary.shipping}
                    icon="/assets/img/truck-ellipse.png"
                />

                <Card
                    color="bg-rose-500"
                    title="Order Done"
                    value={summary.done}
                    icon="/assets/img/People-done.png"
                />

            </div>

            {/* GRAPH */}
            <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 text-lg">
                    Total Penjualan
                </h3>

                <img 
                    src={graphImage} 
                    alt="chart" 
                    className="w-full h-72 object-contain" 
                />
            </div>

            {/* TOP PRODUCT */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-6 text-lg">
                    Produk Terlaris
                </h3>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-gray-400 uppercase text-xs tracking-wider border-b">
                            <tr>
                                <th className="px-4 py-3 font-semibold">No</th>
                                <th className="px-4 py-3 font-semibold">Nama Produk</th>
                                <th className="px-4 py-3 font-semibold">Stock</th>
                                <th className="px-4 py-3 font-semibold text-right">Harga</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-50">
                            {topProducts.map((p, i) => (
                                <tr key={p.product_id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-4 text-gray-500">{i + 1}</td>
                                    <td className="px-4 py-4 font-medium text-gray-700">{p.product_name}</td>
                                    <td className="px-4 py-4 text-gray-600">
                                        <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                                            {p.stock} pcs
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-right font-semibold text-emerald-600">
                                        IDR {p.price.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    )
}


// CARD COMPONENT
const Card = ({ color, title, value, icon }) => {
    return (
        <div className={`w-full ${color} text-white rounded-2xl p-6 flex flex-col gap-3 shadow-lg shadow-gray-200/50 relative overflow-hidden`}>
            <div className="flex items-center gap-4 z-10">
                <div className="bg-white/20 p-2 rounded-lg">
                    <img src={icon} className="w-10 h-10 object-contain" />
                </div>
                <p className="text-sm font-medium text-white/90 uppercase tracking-wide">{title}</p>
            </div>

            <h2 className="text-3xl font-extrabold z-10">{value}</h2>
            
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        </div>
    )
}