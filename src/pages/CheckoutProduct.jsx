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
      <div>
        <NavDiv />
        <p className="text-center mt-20 text-xl">
          Please login to continue checkout
        </p>
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

  const activeClass = "border border-[#FF8906] px-3 w-55 h-10 cursor-pointer"
  const inactiveClass = "border border-[#E8E8E8] px-3 w-55 h-10 cursor-pointer"

  const checkoutPayment = async (data) => {

    if (cartItems.length === 0) {
      return alert("Cart is empty")
    }
    cartItems.map((item, index) => {
      console.log("Item ke-" + index, item)
    })


    const payload = {
      trx_id: Math.floor(Math.random() * 1000000).toString(),
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
          id: response.results.trx_id || `TRX-${Date.now()}`,
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

        await http("/admin/cart/user", { method: "DELETE" })

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
    <div>
      <NavDiv />
      <h1 className="text-4xl py-3 ml-20 mt-10 mb-5">Payment Details</h1>
      <div className="flex ml-20 mr-20 mb-10 gap-5">
        <div className="w-2/3 ">
          <div className="flex justify-between text-xl">
            <p>Your Order</p>
            <p className="bg-[#FF8906] px-3 py-2 rounded cursor-pointer"><Link to="/product">+ Add Menu</Link></p>
          </div>
          {/* product  */}
          {cartItems.length === 0 ? (
            <p className="mt-5 text-gray-500">Your cart is empty</p>
          ) : (cartItems.map((item, index) => (

            // cart 
            <div key={index} className="flex justify-between items-center gap-5 bg-[#E8E8E84D] p-3 mt-5">
              <div className="flex items-center gap-4">
                <img src={item.path} alt={item.product_name} className="w-40 h-40" />
                <div className="flex flex-col gap-3 items-left">
                  <span className="bg-red-600 px-3 rounded-xl w-25 text-white">Flash Sale</span>
                  <p className="font-bold text-xl">{item.product_name}</p>
                  <p className="text-sm text-gray-500">{item.quantity} Pcs | {item.size} | {item.variant}</p>
                  <span className="flex gap-3">
                    <p className="text-red-500 line-through">IDR {(item.price || 0).toLocaleString()}</p>
                    <p className="text-[#FF8906]">IDR {(item.discountPrice || item.price || 0).toLocaleString()}</p>
                  </span>
                </div>
              </div>
              <img src="/assets/img/XCircle.png" alt="delete icon" onClick={() => handleRemove(index)} className="cursor-pointer" />
            </div>
          )))}
        </div>
        {/* Total  */}
        <aside className="w-1/3 ">
          <p className="text-xl">Total</p>
          <div className="flex flex-col gap-3 p-3 bg-[#E8E8E84D] h-84 mt-8">
            <div className="flex justify-between">
              <p>Order</p>
              <p>IDR {orderTotal.toLocaleString()}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery</p>
              <p>IDR {deliveryCost.toLocaleString()}</p>
            </div>
            <div className="flex justify-between">
              <p>Tax</p>
              <p>IDR {tax.toLocaleString()}</p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p>Sub Total</p>
              <p>IDR {subTotal.toLocaleString()}</p>
            </div>
            <button type="submit" form="deliveryForm" className="bg-[#FF8906] w-full rounded py-2 cursor-pointer">Checkout</button>
            <p>We Accept</p>
            <div className="flex gap-3 items-center justify-between">
              <img src="/assets/img/bri.png" alt="bri icon" />
              <img src="/assets/img/dana.png" alt="dana icon" />
              <img src="/assets/img/bca.png" alt="bca icon" />
              <img src="/assets/img/gopay.png" alt="gopay icon" />
              <img src="/assets/img/ovo.png" alt="ovo icon" />
              <img src="/assets/img/logos_paypal.png" alt="paypal icon" />
            </div>
            <p>*Get Discount if you pay with Bank Central Asia</p>
          </div>
        </aside>
      </div>

      <form id="deliveryForm" onSubmit={handleSubmit(checkoutPayment)} className="ml-20 mb-10 flex flex-col gap-3">
        <h2 className="mb-5 text-xl">Payment Info & Delivery</h2>
        <div >
          <label htmlFor="email">Email</label>
          <div className="flex items-center gap-2 p-3 border w-180 border-[#DEDEDE] mt-2 rounded" >
            <img src="/assets/img/mail.png" alt="email icon" className="checkout-input-icon" />
            <input {...register("email")} type="text" id="email" placeholder="Enter Your Email" autoComplete="off" defaultValue={currentUser.email} className=" px-3  w-full " />
          </div>
        </div>
        <div >
          <label htmlFor="fullname">Full Name</label>
          <div className="flex items-center gap-2 p-3 border w-180 border-[#DEDEDE] mt-2 rounded" >
            <img src="/assets/img/Profile.png" alt="name icon" className="checkout-input-icon" />
            <input {...register("fullName")} type="text" id="fullname" placeholder="Enter Your Full Name" autoComplete="off" defaultValue={currentUser.name} className=" px-3  w-full " />
          </div>
        </div>
        <div >
          <label htmlFor="address">Address</label>
          <div className="flex items-center gap-2 p-3 border w-180 border-[#DEDEDE] mt-2 rounded" >
            <img src="/assets/img/Location.png" alt="address icon" className="checkout-input-icon" />
            <input {...register("address", { required: true })} type="text" id="address" placeholder="Enter Your Address" autoComplete="address" className=" px-3  w-full " />
          </div>
        </div>
        <div >
          <label>Delivery</label>
          <div className="flex gap-5 p-3 w-[70%]">
            {["Dine In", "Door Delivery", "Pick Up"].map((item) => (
              <button type="button" key={item} onClick={() => setDelivery(item)} className={`px-3 w-55 h-10 border cursor-pointer ${delivery === item ? activeClass : inactiveClass}`}>{item}</button>
            ))}
          </div>
        </div>
      </form>
      <Footer />
    </div>
  )
}
