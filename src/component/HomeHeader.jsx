import { Link } from "react-router-dom"
import mainImg from "/assets/img/Rectangle287.png"


export const HomeHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row">
        {/* content  */}
        <main className="w-full lg:w-1/2 h-auto bg-zinc-950">
            <div className="text-white px-10 py-20 lg:px-30 lg:py-40">
                <h1 className="font-bold text-xl md:text-3xl lg:text-5xl mb-6 lg:mb-10">Start Your Day with Coffee and Good Meals</h1>
                <p>We provide high quality beans, good taste, and healthy meals made by love just fot you. Start your day with us for a bigger smile!</p>
                <div className="w-28 h-10 bg-[#FF8906] mt-10 flex items-center justify-center text-black rounded">
                    <Link to="/product">Get Started</Link>
                </div>
                <div className="flex gap-8 mt-10">
                    <div className="flex flex-col border-4 border-zinc-950 border-r-white pr-4">
                        <div className="text-[#FF8906] font-bold text-5xl">90+</div>
                        <div>Staff</div>
                    </div>
                    <div className="flex flex-col border-4 border-zinc-950 border-r-white pr-4 ">
                        <div className="text-[#FF8906] font-bold text-5xl">30+</div>
                        <div>Stores</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-[#FF8906] font-bold text-5xl">800+</div>
                        <div>Customer</div>
                    </div>
                </div>
            </div>
            
        </main>

        {/* side image  */}
        <aside className="hidden lg:block lg:w-1/2">
            <img src={mainImg} alt="main-img" />
        </aside>
    </div>
  )
}
