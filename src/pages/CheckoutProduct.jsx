import { useEffect, useState } from "react"
import { Footer } from "../component/Footer"
import { NavDiv } from "../component/NavDiv"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useCart } from "../component/hook/useCart"
import { addOrder, setCart } from "../redux/reducers/cartReducer"
import { useDispatch } from "react-redux"
import http from "../lib/http.js"

const PPN = 0.1

export const CheckoutProduct = () => {
  const { handleSubmit, register } = useForm()
  const [delivery, setDelivery] = useState("Dine In")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { cartItems, currentUser, handleRemove, clearCart } = useCart()

  useEffect(() => {
    const fetchCartFromDB = async () => {
      try {
        const response = await http("/admin/cart/", { method: "GET" })
        if (response.success) {
          dispatch(setCart({
            email: currentUser.email,
            items: response.results
          }))
        }
      } catch (err) {
        console.error("Failed to sync cart:", err)
      }
    }

    if (currentUser) {
      fetchCartFromDB()
    }
  }, [currentUser, dispatch])

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <NavDiv />
        <div className="flex grow items-center justify-center">
            <div className="text-center p-10 bg-white rounded-3xl shadow-xl">
                <p className="text-2xl font-bold text-gray-800 mb-4">Akses Terbatas</p>
                <p className="text-gray-500 mb-6">Please login to continue checkout</p>
                <Link to="/login" className="bg-[#FF8906] text-white px-8 py-3 rounded-xl font-bold shadow-lg">Login Sekarang</Link>
            </div>
        </div>
        <Footer />
      </div>
    )
  }

  let orderTotal = 0
  cartItems.forEach((item) => {
    const currentPrice = item.discountPrice || item.price || 0
    orderTotal += currentPrice * item.quantity
  })

  const tax = orderTotal * PPN
  const deliveryCost = delivery === "Door Delivery" ? 10000 : 0
  const subTotal = orderTotal + tax + deliveryCost

  const activeClass = "border-2 border-[#FF8906] bg-orange-50 text-[#FF8906] font-bold shadow-sm"
  const inactiveClass = "border border-gray-200 text-gray-500 hover:bg-gray-50"

  const checkoutPayment = async (data) => {
    if (cartItems.length === 0) {
      return alert("Cart is empty")
    }

    const payload = {
      trx_id: 'TRX' + Date.now().toString(),
      fullname: data.fullName,
      email: data.email,
      address: data.address,
      delivery: delivery,
      delivery_fee: deliveryCost,
      tax: Math.round(tax),
      total: Math.round(subTotal),
      status_order: "Pending"
    }

    try {
      const response = await http("/admin/transaction/", {
        method: "POST",
        body: payload
      })

      if (response.success) {
        const newOrder = {
          id: response.results.trx_id,
          customer: data,
          cartItems: [...cartItems],
          delivery: delivery,
          paymentMethod: "Cash",
          orderTotal: orderTotal,
          tax: tax,
          deliveryCost: deliveryCost,
          subTotal: subTotal,
          date: new Date().toISOString()
        }

        dispatch(addOrder({
          email: currentUser.email,
          order: newOrder
        }))

        const delRes = await http("/admin/cart/user", { method: "DELETE" })
        clearCart()
        alert("Transaction Successful!")
        navigate("/history-order")
      } else {
        alert(response.message || "Failed to create transaction")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      alert("Connection error to server")
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavDiv />
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Payment Details</h1>
        
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* LEFT COLUMN: ORDER & FORM */}
          <div className="lg:w-2/3 space-y-10">
            
            {/* Order Summary Section */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Order</h2>
                <Link to="/product" className="text-sm font-bold text-[#FF8906] bg-orange-50 px-4 py-2 rounded-xl hover:bg-orange-100 transition-colors">+ Add Menu</Link>
              </div>

              {/* product  */}
              <div className="space-y-4">
                {cartItems.length === 0 ? (
                  <div className="py-10 text-center">
                     <p className="text-gray-400 italic">Your cart is empty</p>
                  </div>
                ) : (cartItems.map((item, index) => (
                  // cart 
                  <div key={index} className="flex flex-col sm:flex-row justify-between items-center gap-6 p-4 rounded-2xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-inner bg-white">
                        <img src={item.path} alt={item.product_name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col gap-1 text-center sm:text-left">
                        <span className="bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mx-auto sm:mx-0">Flash Sale</span>
                        <p className="font-extrabold text-xl text-gray-800">{item.product_name}</p>
                        <p className="text-xs font-semibold text-gray-400">{item.quantity} Pcs | {item.size} | {item.variant}</p>
                        <div className="flex gap-3 justify-center sm:justify-start mt-2">
                          <p className="text-red-400 line-through text-sm">IDR {(item.price || 0).toLocaleString()}</p>
                          <p className="text-[#FF8906] font-bold">IDR {(item.discountPrice || item.price || 0).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleRemove(index)} className="p-2 hover:bg-red-50 rounded-full transition-colors group">
                      <img src="/assets/img/XCircle.png" alt="delete icon" className="w-8 h-8 opacity-40 group-hover:opacity-100" />
                    </button>
                  </div>
                )))}
              </div>
            </div>

            {/* Form Section */}
            <form id="deliveryForm" onSubmit={handleSubmit(checkoutPayment)} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Payment Info & Delivery</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-bold text-gray-500 ml-1">Email Address</label>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus-within:border-[#FF8906] focus-within:bg-white transition-all">
                    <img src="/assets/img/mail.png" alt="email icon" className="w-5 h-5 opacity-50" />
                    <input {...register("email", { required: true })} type="email" id="email" placeholder="Enter Your Email" defaultValue={currentUser.email} className="bg-transparent w-full outline-none text-gray-700 font-medium" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="fullname" className="text-sm font-bold text-gray-500 ml-1">Full Name</label>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus-within:border-[#FF8906] focus-within:bg-white transition-all">
                    <img src="/assets/img/Profile.png" alt="name icon" className="w-5 h-5 opacity-50" />
                    <input {...register("fullName", { required: true })} type="text" id="fullname" placeholder="Enter Your Full Name" defaultValue={currentUser.fullname} className="bg-transparent w-full outline-none text-gray-700 font-medium" />
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="address" className="text-sm font-bold text-gray-500 ml-1">Delivery Address</label>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-2xl focus-within:border-[#FF8906] focus-within:bg-white transition-all">
                    <img src="/assets/img/Location.png" alt="address icon" className="w-5 h-5 opacity-50" />
                    <input {...register("address", { required: true })} type="text" id="address" placeholder="Enter Your Complete Address" className="bg-transparent w-full outline-none text-gray-700 font-medium" />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <label className="text-sm font-bold text-gray-500 ml-1 block mb-4">Delivery Method</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {["Dine In", "Door Delivery", "Pick Up"].map((item) => (
                    <button 
                      type="button" 
                      key={item} 
                      onClick={() => setDelivery(item)} 
                      className={`py-4 rounded-2xl transition-all duration-300 text-sm font-bold ${delivery === item ? activeClass : inactiveClass}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN */}
          <aside className="lg:w-1/3">
            <div className="sticky top-10 space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Order</span>
                    <span className="text-gray-800">IDR {orderTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Delivery</span>
                    <span className="text-gray-800">IDR {deliveryCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Tax (10%)</span>
                    <span className="text-gray-800">IDR {tax.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-dashed border-gray-200 pt-4 flex justify-between">
                    <span className="text-lg font-bold text-gray-800">Sub Total</span>
                    <span className="text-2xl font-extrabold text-[#FF8906]">IDR {subTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  form="deliveryForm" 
                  className="w-full bg-[#FF8906] hover:bg-orange-600 text-white font-extrabold py-4 rounded-2xl shadow-lg shadow-orange-100 transition-all active:scale-95 mb-8"
                >
                  Checkout Now
                </button>

                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">We Accept</p>
                    <div className="grid grid-cols-3 gap-4 opacity-70 grayscale hover:grayscale-0 transition-all">
                        <img src="/assets/img/bri.png" alt="bri" className="h-6 object-contain" />
                        <img src="/assets/img/dana.png" alt="dana" className="h-6 object-contain" />
                        <img src="/assets/img/bca.png" alt="bca" className="h-6 object-contain" />
                        <img src="/assets/img/gopay.png" alt="gopay" className="h-6 object-contain" />
                        <img src="/assets/img/ovo.png" alt="ovo" className="h-6 object-contain" />
                        <img src="/assets/img/logos_paypal.png" alt="paypal" className="h-6 object-contain" />
                    </div>
                    <p className="mt-6 text-[10px] text-gray-400 leading-relaxed">*Get 10% Discount if you pay with Bank Central Asia (BCA)</p>
                </div>
              </div>
            </div>
          </aside>
          
        </div>
      </div>
      
      <Footer />
    </div>
  )
}