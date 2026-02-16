import graphImage from "/assets/img/graph.png"

export const Dashboard = () => {
  return (
    <div className="p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="w-80 bg-green-500 text-white rounded-xl p-5 flex justify-between flex-col items-left gap-2"> 
                <div className="flex items-center gap-4">
                    <img src="/assets/img/cup-ellipse.png" alt="process icon" className="w-12 h-12"/>
                    <p className="text-sm opacity-80">Order On Progress</p>
                </div>
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold px-1">200</h2>
                    <p>+11.01% </p>
                </div>
            </div>
            <div className="w-80 bg-indigo-500 text-white rounded-xl p-5 flex justify-between flex-col items-left gap-2">
                <div className="flex items-center gap-4">
                    <img src="/assets/img/truck-ellipse.png" alt="truck shipping icon" className="w-12 h-12"/>
                    <p className="text-sm opacity-80">Order Shipping</p>
                </div>
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold px-1">100</h2>
                    <p>+4.01% </p>
                </div>   
            </div>
            <div className="w-80 bg-pink-500 text-white rounded-xl p-5 flex justify-between flex-col items-left gap-2">
                <div className="flex items-center gap-4">
                    <img src="/assets/img/People-done.png" alt="done icon" className="w-12 h-12"/>
                    <p className="text-sm opacity-80">Order Done</p>
                </div>
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold px-1">50</h2>
                    <p>+2.01% </p>
                </div>
            </div>
        </div>
            {/* <!-- graph  --> */}
        <div className="bg-white rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="font-semibold text-gray-700">Total Penjualan</h3>
                    <p className="text-sm text-gray-400">1000 Cup (16 - 23 January 2023)</p>
                </div>
                <span className="border px-4 py-2 rounded-md text-sm text-gray-600">
                    16 - 23 January 2023
                </span>
            </div>
            <img src={graphImage} alt="chart" className="w-full h-64 object-contain"/>
        </div>
            {/* <!-- product data  --> */}
        <div className="bg-white rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700">Produk Terlaris</h3>
                <span className="border px-4 py-2 rounded-md text-sm text-gray-600">
                    16 - 23 January 2023
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="text-gray-500 border-b">
                        <tr>
                            <th className="py-3 text-left">No</th>
                            <th className="py-3 text-left">Nama Produk</th>
                            <th className="py-3 text-left">Terjual</th>
                            <th className="py-3 text-left">Keuntungan</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                            <tr>
                                <td className="py-3">1</td>
                                <td>Caramel Macchiato</td>
                                <td>300 Cup</td>
                                <td className="text-green-500">IDR 9.000.000</td>
                            </tr>
                            <tr>
                                <td className="py-3">2</td>
                                <td>Hazelnut Latte</td>
                                <td>200 Cup</td>
                                <td className="text-green-500">IDR 8.000.000</td>
                            </tr>
                            <tr>
                                <td className="py-3">3</td>
                                <td>Kopi Susu</td>
                                <td>100 Cup</td>
                                <td className="text-green-500">IDR 7.000.000</td>
                            </tr>
                            <tr>
                                <td className="py-3">4</td>
                                <td>Espresso Supreme</td>
                                <td>90 Cup</td>
                                <td className="text-green-500">IDR 6.000.000</td>
                            </tr>
                            <tr>
                                <td className="py-3">5</td>
                                <td>Caramel Velvet Latte</td>
                                <td>80 Cup</td>
                                <td className="text-green-500">IDR 5.000.000</td>
                            </tr>
                            <tr>
                                <td className="py-3">6</td>
                                <td>Hazelnut Dream Brew</td>
                                <td>70 Cup</td>
                                <td className="text-green-500">IDR 4.000.000</td>
                            </tr>
                            <tr>
                                <td className="py-3">7</td>
                                <td>Vanilla Silk Mocha</td>
                                <td>60 Cup</td>
                                <td className="text-green-500">IDR 3.000.000</td>
                            </tr>
                            <tr>
                                <td className="py-3">8</td>
                                <td>Dark Roast Delight</td>
                                <td>50 Cup</td>
                                <td className="text-green-500">IDR 2.000.000</td>
                            </tr>
                            <tr>
                                <td className="py-3">9</td>
                                <td>Ethiopian Yirgacheffe Euphoria</td>
                                <td>40 Cup</td>
                                <td className="text-green-500">IDR 1.000.000</td>
                            </tr>
                            <tr>
                                <td className="py-3">10</td>
                                <td>Indonesian Sumatra Reserve</td>
                                <td>30 Cup</td>
                                <td className="text-green-500">IDR 500.000</td>
                            </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
