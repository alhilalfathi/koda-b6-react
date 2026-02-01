import { Footer } from "../component/Footer"
import { NavDiv } from "../component/NavDiv"
import { ProductDiv } from "../component/ProductSmallDiv"



export const DetailOrder = () => {
  return (
    <div>
        <NavDiv />
        <div className="mx-20 mt-10">
            <h1 className="text-3xl font-bold">Order #12354-09893</h1>
            <p>21 March 2023 at 10:30 AM</p>
        </div>
        <div className="flex mx-20 mt-10 gap-3 mb-10">
            <div className="flex flex-col w-1/2">
                <h2 className="mb-5">Order Information</h2>
                <div className="flex justify-between py-3 px-2 bg-[#E8E8E84D] border border-[#E8E8E8] ">
                    <span className="flex items-center gap-3"><img src="/assets/img/Profile.png" alt="profile icon"/>Full Name</span>
                    <p><b>Ghaluh Wizard Anggoro</b></p>
                </div>
                <div className="flex justify-between py-3 px-2 bg-[#E8E8E84D] border border-[#E8E8E8] ">
                    <span className="flex items-center gap-3"><img src="/assets/img/Location.png" alt="location icon"/>Address</span>
                    <p><b>Griya bandung indah</b></p>
                </div>
                <div className="flex justify-between py-3 px-2 bg-[#E8E8E84D] border border-[#E8E8E8] ">
                    <span className="flex items-center gap-3"><img src="/assets/img/PhoneCall.png" alt="phone icon"/>Phone</span>
                    <p><b>082116304338</b></p>
                </div>
                <div className="flex justify-between py-3 px-2 bg-[#E8E8E84D] border border-[#E8E8E8] ">
                    <span className="flex items-center gap-3"><img src="/assets/img/u_postcard.png" alt="postcard icon"/>Payment Method</span>
                    <p><b>Cash</b></p>
                </div>
                <div className="flex justify-between py-3 px-2 bg-[#E8E8E84D] border border-[#E8E8E8] ">
                    <span className="flex items-center gap-3"><img src="/assets/img/truck.png" alt="truck shipping icon"/>Shipping</span>
                    <p><b>Dine In</b></p>
                </div>
                <div className="flex justify-between py-3 px-2 bg-[#E8E8E84D] border border-[#E8E8E8] ">
                    <span className="flex items-center gap-3"><img src="/assets/img/u_process.png" alt="process icon"/>Status</span>
                    <p className="bg-green-200 p-2 rounded-2xl">Done</p>
                </div>
                <div className="flex justify-between py-3 px-2">
                    <span>Total Transaction</span>
                    <p className="text-yellow-600">Idr 40.000</p>
                </div>
            </div>
            <aside className="w-1/2">
              <h2>Your Order</h2>
              <div className="w-full">
                <ProductDiv />
                <ProductDiv />
              </div>
            </aside>
        </div>
        <Footer />
    </div>
  )
}
