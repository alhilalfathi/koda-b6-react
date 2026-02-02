import { useEffect, useState } from "react"
import { Footer } from "../component/Footer"
import { NavDiv } from "../component/NavDiv"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

export const CheckoutProduct = () => {
  const {handleSubmit, register} = useForm()
  const [cartItems, setCartsItem] = useState([])
  const [delivery, setDelivery] = useState("Dine In")
  const navigate = useNavigate()

  useEffect(()=>{
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
    if(!loggedUser){
      return
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || {}
    const userCart = cart[loggedUser.email] || []
    setCartsItem(userCart)
  },[])

  const handleRemove = (index) => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
    if(!loggedUser){
      return
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || {}
    const updatedCart = [...cartItems]

    updatedCart.splice(index, 1)

    cart[loggedUser.email] = updatedCart
    localStorage.setItem("cart",JSON.stringify(cart))

    setCartsItem(updatedCart)
  }
  let orderTotal = 0
  cartItems.forEach((item) => {
    orderTotal += item.discountPrice * item.quantity
  })

  const tax = orderTotal * 0.1
  const deliveryCost = delivery === "Door Delivery" ? 10000 : 0
  const subTotal = orderTotal + tax + deliveryCost

  const activeClass = "border border-[#FF8906] px-3 w-55 h-10 cursor-pointer"
  const inactiveClass = "border border-[#E8E8E8] px-3 w-55 h-10 cursor-pointer" 

  const checkoutPayment = (data) => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
    if (!loggedUser || cartItems.length === 0){
      return
    }
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || {}

    const newOrder = {
      id: `#123-${Date.now()}`,
      customer: data,
      cartItems,
      delivery,
      paymentMethod: "Cash",
      orderTotal,
      tax,
      deliveryCost,
      subTotal,
      date: new Date().toISOString()
    }

    if(!orderHistory[loggedUser.email]){
      orderHistory[loggedUser.email] = []
    }
    orderHistory[loggedUser.email].push(newOrder)
    localStorage.setItem("orderHistory",JSON.stringify(orderHistory))
    
    const cart = JSON.parse(localStorage.getItem("cart")) || {}
    cart[loggedUser.email] = []
    localStorage.setItem("cart", JSON.stringify(cart))
    setCartsItem([])

    navigate("/history-order")
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
                <img src={item.img} alt={item.name} className="w-40 h-40" />
                <div className="flex flex-col gap-3 items-left">
                  <span className="bg-red-600 px-3 rounded-xl w-25 text-white">Flash Sale</span>
                  <p className="font-bold text-xl">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.quantity} Pcs | {item.size} | {item.temp}</p>
                  <span className="flex gap-3">
                    <p className="text-red-500 line-through">IDR {item.price.toLocaleString()}</p>
                    <p className="text-[#FF8906]">IDR {item.discountPrice.toLocaleString()}</p>
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
          <div className="flex flex-col gap-3 p-3 bg-[#E8E8E84D] h-80 mt-8">
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
            <hr/>
            <div className="flex justify-between">
              <p>Sub Total</p>
              <p>IDR {subTotal.toLocaleString()}</p>
            </div>
            <button type="submit" form="deliveryForm" className="bg-[#FF8906] w-full rounded py-2 cursor-pointer">Checkout</button>
            <p>We Accept</p>
            <div className="flex gap-3 items-center justify-between">
              <img src="/assets/img/bri.png" alt="bri icon"/>
              <img src="/assets/img/dana.png" alt="dana icon"/>
              <img src="/assets/img/bca.png" alt="bca icon"/>
              <img src="/assets/img/gopay.png" alt="gopay icon"/>
              <img src="/assets/img/ovo.png" alt="ovo icon"/>
              <img src="/assets/img/logos_paypal.png" alt="paypal icon"/>
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
            <img src="/assets/img/mail.png" alt="email icon" className="checkout-input-icon"/>
            <input {...register("email")} type="text" id="email" placeholder="Enter Your Email" className=" px-3  w-full "/>
          </div>
        </div>
        <div >
          <label htmlFor="fullname">Full Name</label>
          <div className="flex items-center gap-2 p-3 border w-180 border-[#DEDEDE] mt-2 rounded" >
            <img src="/assets/img/Profile.png" alt="name icon" className="checkout-input-icon"/>
            <input {...register("fullName")} type="text" id="fullname" placeholder="Enter Your Full Name" className=" px-3  w-full "/>
          </div>
        </div>
        <div >
          <label htmlFor="address">Address</label>
          <div className="flex items-center gap-2 p-3 border w-180 border-[#DEDEDE] mt-2 rounded" >
              <img src="/assets/img/Location.png" alt="address icon" className="checkout-input-icon"/>
              <input {...register("address")} type="text" id="address" placeholder="Enter Your Address" className=" px-3  w-full "/>
          </div>
        </div>
        <div >
          <label>Delivery</label>
          <div className="flex gap-5 p-3 w-[70%]">
            {["Dine In", "Door Delivery", "Pick Up"].map((item)=>(
              <button type="button" key={item} onClick={()=> setDelivery(item)} className={`px-3 w-55 h-10 border cursor-pointer ${delivery === item ? activeClass : inactiveClass}`}>{item}</button>
            ))}
          </div>
        </div>
      </form>
      <Footer />
    </div>
  )
}
