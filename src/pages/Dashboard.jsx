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
        <div className="p-6 max-w-7xl mx-auto">

            {/* SUMMARY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">

                <Card
                    color="bg-green-500"
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
                    color="bg-pink-500"
                    title="Order Done"
                    value={summary.done}
                    icon="/assets/img/People-done.png"
                />

            </div>

            {/* GRAPH */}
            <div className="bg-white rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">
                    Total Penjualan
                </h3>

                <img 
                    src={graphImage} 
                    alt="chart" 
                    className="w-full h-64 object-cover" 
                />
            </div>

            {/* TOP PRODUCT */}
            <div className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-gray-700 mb-4">
                    Produk Terlaris
                </h3>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-150 text-sm">
                        <thead className="text-gray-500 border-b">
                            <tr>
                                <th>No</th>
                                <th>Nama Produk</th>
                                <th>Stock</th>
                                <th>Harga</th>
                            </tr>
                        </thead>

                        <tbody>
                            {topProducts.map((p, i) => (
                                <tr key={p.product_id}>
                                    <td>{i + 1}</td>
                                    <td>{p.product_name}</td>
                                    <td>{p.stock}</td>
                                    <td className="text-green-500">
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
        <div className={`w-full ${color} text-white rounded-xl p-5 flex flex-col gap-2 shadow-md`}>
            <div className="flex items-center gap-4">
                <img src={icon} className="w-12 h-12" />
                <p className="text-sm opacity-80">{title}</p>
            </div>

            <h2 className="text-2xl font-bold">{value}</h2>
        </div>
    )
}