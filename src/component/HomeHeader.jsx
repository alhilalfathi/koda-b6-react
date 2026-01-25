import { Link } from "react-router-dom"
import mainImg from "../assets/img/Rectangle287.png"


export const HomeHeader = () => {
  return (
    <div className="flex flex-col md:flex-row">
        <main className="w-full md:w-1/2 h-auto bg-zinc-950">
            <div className="text-white px-6 py-20 md:px-30 md:py-40">
                <h1 className="font-bold text-3xl md:text-5xl mb-6 md:mb-10">Start Your Day with Coffee and Good Meals</h1>
                <p>We provide high quality beans, good taste, and healthy meals made by love just fot you. Start your day with us for a bigger smile!</p>
                <div className="w-28 h-10 bg-orange-600 mt-10 flex items-center justify-center text-black rounded">
                    <Link>Get Started</Link>
                </div>
                <div className="flex gap-8 mt-10">
                    <div className="flex flex-col border-4 border-zinc-950 border-r-white pr-4">
                        <div className="text-orange-600 font-bold text-5xl">90+</div>
                        <div>Staff</div>
                    </div>
                    <div className="flex flex-col border-4 border-zinc-950 border-r-white pr-4 ">
                        <div className="text-orange-600 font-bold text-5xl">30+</div>
                        <div>Stores</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-orange-600 font-bold text-5xl">800+</div>
                        <div>Customer</div>
                    </div>
                </div>
            </div>
            
        </main>

        <aside className="hidden md:block md:w-1/2">
            <img src={mainImg} alt="main-img" />
        </aside>
    </div>
  )
}
