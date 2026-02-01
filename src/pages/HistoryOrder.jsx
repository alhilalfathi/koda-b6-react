import { Footer } from "../component/Footer"
import { NavDiv } from "../component/NavDiv"
import { Pagination } from "../component/Pagination"
import { LuCalendarDays } from "react-icons/lu";

const ProductDiv = () => {
    return(
        <div className="flex gap-5 my-5 bg-[#E8E8E8] p-3">
            <img src="/assets/img/image31.png" alt="product image" className="w-24 h-24" />
            <div className="flex flex-col justify-top items-center">
                <span className="flex gap-3 justify-center items-center">
                    <img src="/assets/img/order.png"/> No. Order
                </span>
                <p className="font-bold">#12354-09893</p>
                <a href="#">Views Order Detail</a>
            </div>
            <div className="flex flex-col justify-top items-center">
                <span className="flex gap-3 justify-center items-center">
                    <img src="/assets/img/Calendar.png"/> Date
                </span>
                <p className="font-bold">23 January 2023</p>
            </div>
            <div className="flex flex-col justify-top items-center">
                <span className="flex gap-3 justify-center items-center">
                    <img src="/assets/img/Repeat.png"/> Total
                </span>
                <p className="font-bold">Idr 40.000</p>
            </div>
            <div className="flex flex-col justify-top items-center">
                <span className="flex gap-3 justify-center items-center">
                    <img src="/assets/img/u_process.png"/> Status
                </span>
                <p className="bg-orange-300 py-3 px-2 rounded-2xl">On Progress</p>
            </div>
        </div>
    )
}

export const HistoryOrder = () => {
  return (
    <div>
        <NavDiv />
        <div>
            {/* title  */}
            <div className="flex gap-5 items-center ml-20 mt-10 mb-5">
                <h1 className="text-4xl py-3">History Order</h1>
                <span className="bg-[#E8E8E8] px-2 mt-3">2</span>
            </div>

            <div className="flex gap-5 mx-20">
                <div className="w-[60%]">
                    {/* delivery status and date container */}
                    <div className="flex gap-10 mb-10 justify-between">
                        {/* delivery progress  */}
                        <div className="flex gap-5 bg-[#E8E8E8] px-5 py-3 items-center justify-center">
                            <p className="bg-white p-2">On Progress</p>
                            <p>Sending Goods</p>
                            <p>Finish Order</p>
                        </div>
                        {/* date  */}
                        <div className="flex justify-center items-center bg-[#E8E8E8] p-5 ">
                            <LuCalendarDays />
                            <select id="month" name="month">
                                <option value="January">January 2023</option>
                                <option value="February">February 2023</option>
                                <option value="March">March 2023</option>
                                <option value="April">April 2023</option>
                                <option value="April">May 2023</option>
                                <option value="April">June 2023</option>
                                <option value="April">July 2023</option>
                                <option value="April">August 2023</option>
                                <option value="April">September 2023</option>
                                <option value="April">October 2023</option>
                                <option value="April">November 2023</option>
                                <option value="April">December 2023</option>
                            </select>
                        </div>
                    </div>

                    {/* product  */}
                    <ProductDiv />
                    <ProductDiv />
                    <ProductDiv />
                    <ProductDiv />
                </div>

                <aside className="w-[40%] border border-[#E8E8E8] h-full p-5">
                    <img src="/assets/img/message.png" alt="message icon"/>
                    <h3 className="font-bold mt-2 mb-3">Send Us Message</h3>
                    <p>if your unable to find answer or find your product quickly, please describe your problem and tell us. we will give you solution.</p>
                    <div className="bg-[#FF8906] px-5 py-3 w-full rounded my-5 flex justify-center items-center"><a href="#" >Send Message</a></div>
                </aside>
            </div>
        </div>
        <div className="flex justify-center mt-5 mb-10">
            <Pagination />
        </div>
        <Footer />
    </div>
  )
}
