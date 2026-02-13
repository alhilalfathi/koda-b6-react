import { useParams } from "react-router-dom"
import { Footer } from "../component/Footer"
import { NavDiv } from "../component/NavDiv"
import { useSelector } from "react-redux"



const InfoRow = ({ icon, label, value }) => (
  <div className="flex justify-between py-3 px-2 bg-[#E8E8E84D] border border-[#E8E8E8]">
    <span className="flex items-center gap-3">
      <img src={`/assets/img/${icon}`} />
      {label}
    </span>
    <p>
      <b>{value}</b>
    </p>
  </div>
)

export const DetailOrder = () => {
  const { orderId } = useParams()

  const currentUser = useSelector((state) => state.auth.user)
  const allOrders = useSelector((state) => state.cart.orders)

  const userOrders = currentUser ? allOrders[currentUser.email] || [] : []
  const order = userOrders.find((item) => item.id === orderId)

  if (!currentUser) {
    return (
      <div>
        <NavDiv />
        <p className="text-center mt-20">Please login first</p>
        <Footer />
      </div>
    )
  }

  if (!order) {
    return (
      <div>
        <NavDiv />
        <p className="text-center mt-20">Loading order detail...</p>
      </div>
    )
  }
  return (
    <div>
      <NavDiv />
      <div className="mx-20 mt-10">
        <h1 className="text-3xl font-bold">Order {order.id}</h1>
        <p>{new Date(order.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}</p>
      </div>
      <div className="flex mx-20 mt-10 gap-3 mb-10">
        <div className="flex flex-col w-1/2">

          <h2 className="mb-5">Order Information</h2>
          <InfoRow icon="Profile.png" label="Full Name" value={order.customer.fullName} />
          <InfoRow icon="Location.png" label="Address" value={order.customer.address} />
          <InfoRow icon="PhoneCall.png" label="Phone" value={"082116304338"} />
          <InfoRow icon="u_postcard.png" label="Payment Method" value={order.paymentMethod} />
          <InfoRow icon="truck.png" label="Shipping" value={order.delivery} />

          <div className="flex justify-between py-3 px-2 bg-[#E8E8E84D] border border-[#E8E8E8] ">
            <span className="flex items-center gap-3"><img src="/assets/img/u_process.png" alt="process icon" />Status</span>
            <p className="bg-green-200 p-2 rounded-2xl">Done</p>
          </div>
          <div className="flex justify-between py-3 px-2">
            <span>Total Transaction</span>
            <p className="text-yellow-600">IDR {order.subTotal.toLocaleString()}</p>
          </div>
        </div>
        {/* product  */}
        <aside className="w-1/2">
          <h2>Your Order</h2>
          {order.cartItems.map((item, index) =>
          (
            <div key={index} className="flex items-center gap-5 bg-[#E8E8E84D] p-3 mt-5">
              <img src={item.img} alt={item.name} className="w-40 h-40" />
              <div className="flex flex-col gap-3 items-left">
                <span className="bg-red-600 px-3 rounded-xl w-25 text-white">Flash Sale</span>
                <h3>{item.name}</h3>
                <p>{item.quantity} pcs   |   {item.size}   |   {item.temp}   |   {order.delivery}</p>
                <div className="flex gap-2">
                  <span className="text-red-400"><del>IDR {item.price.toLocaleString()}</del></span>
                  <span>IDR {(item.discountPrice * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            </div>
          )
          )}
        </aside>
      </div>
      <Footer />
    </div>
  )
}
