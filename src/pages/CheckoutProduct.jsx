import { Footer } from "../component/Footer"
import { NavDiv } from "../component/NavDiv"

const ProductDiv = () => {
  return(
    <div className="flex items-center gap-5 bg-[#E8E8E84D] p-3 mt-5">
      <img src="src/assets/img/image31.png" alt="product image" className="w-40 h-40"/>
        <div className="flex flex-col gap-3 items-left">
          <span className="bg-red-600 px-3 rounded-xl w-25 text-white">Flash Sale</span>
          <h3>Hazelnut Latte</h3>
          <p>2pcs   |   Regular   |   Ice   |   Dine In</p>
          <div className="flex gap-2">
            <span className="text-red-400"><del>IDR 20.000</del></span>
            <span>IDR10.000</span>
          </div>
        </div>
      <img className="w-6 h-6 ml-70" src="src/assets/img/XCircle.png" alt="delete icon"/>
    </div>
  )
}

export const CheckoutProduct = () => {
  return (
    <div>
      <NavDiv />
      <h1 className="text-4xl py-3 ml-20 mt-10 mb-5">Payment Details</h1>
      <div className="flex ml-20 mr-20 mb-10 gap-5">
        <div className="w-2/3 ">
          <div className="flex justify-between text-xl">
            <p>Your Order</p>
            <p className="bg-[#FF8906] px-3 rounded">+ Add Menu</p>
          </div>
          {/* product  */}
          <ProductDiv />
          <ProductDiv />
        </div>
        <aside className="w-1/3 ">
          <p className="text-xl">Total</p>
          <div className="flex flex-col gap-3 p-3 bg-[#E8E8E84D] h-80 mt-5">
            <div className="flex justify-between">
              <p>Order</p>
              <p>Idr. 40.000</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery</p>
              <p>Idr. 0</p>
            </div>
            <div className="flex justify-between">
              <p>Tax</p>
              <p>Idr. 4000</p>
            </div>
            <hr/>
            <div className="flex justify-between">
              <p>Sub Total</p>
              <p>Idr.44.000</p>
            </div>
            <button className="bg-[#FF8906] w-full rounded">Checkout</button>
            <p>We Accept</p>
            <div className="flex gap-3 items-center">
              <img src="src/assets/img/bri.png" alt="bri icon"/>
              <img src="src/assets/img/dana.png" alt="dana icon"/>
              <img src="src/assets/img/bca.png" alt="bca icon"/>
              <img src="src/assets/img/gopay.png" alt="gopay icon"/>
              <img src="src/assets/img/ovo.png" alt="ovo icon"/>
              <img src="src/assets/img/logos_paypal.png" alt="paypal icon"/>
            </div>
              <p>*Get Discount if you pay with Bank Central Asia</p>
          </div>
        </aside>
      </div>

      <div className="ml-20 mb-10 flex flex-col gap-3">
        <h2 className="mb-5 text-xl">Payment Info & Delivery</h2>
        <div >
          <label for="email">Email</label>
          <div className="flex items-center gap-2 p-3 border w-180 border-[#DEDEDE] mt-2 rounded" >
            <img src="src/assets/img/mail.png" alt="email icon" class="checkout-input-icon"/>
            <input type="text" id="email" placeholder="Enter Your Email" className=" px-3  w-full "/>
          </div>
        </div>
        <div >
          <label for="fullname">Full Name</label>
          <div className="flex items-center gap-2 p-3 border w-180 border-[#DEDEDE] mt-2 rounded" >
            <img src="src/assets/img/Profile.png" alt="name icon" class="checkout-input-icon"/>
            <input type="text" id="fullname" placeholder="Enter Your Full Name" className=" px-3  w-full "/>
          </div>
        </div>
        <div >
          <label for="address">Address</label>
          <div className="flex items-center gap-2 p-3 border w-180 border-[#DEDEDE] mt-2 rounded" >
              <img src="src/assets/img/Location.png" alt="address icon" class="checkout-input-icon"/>
              <input type="text" id="address" placeholder="Enter Your Address" className=" px-3  w-full "/>
          </div>
        </div>
        <div >
          <label>Delivery</label>
          <div className="flex gap-3 p-3">
            <button className="border border-[#FF8906] px-3 w-60 h-10 cursor-pointer">Dine in</button>
            <button className="border border-[#E8E8E8] px-3 w-60 h-10 cursor-pointer">Door Delivery</button>
            <button className="border border-[#E8E8E8] px-3 w-60 h-10 cursor-pointer">Pick Up</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
