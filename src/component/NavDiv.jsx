import logo from "../assets/img/Frame13.png"
import searchIcon from "../assets/img/Search.png"
import cartIcon from "../assets/img/ShoppingCart.png"
import { Link } from "react-router-dom"

export const NavDiv = () => {
  return (
    <div className="w-full h-16 flex justify-between bg-black px-4 md:px-20">
            {/* left navbar  */}
            <div className="flex items-center gap-6">
                <div >
                    <img className="w-auto h-8" src={logo} alt="logo-kopi"/>
                </div>
                <ul className="text-white hidden md:flex gap-6">
                    <li><Link to="/">Home</Link></li>
                    <li> <Link to="/product" className="underline underline-offset-8 decoration-[#FF8906]">Product</Link></li>
                </ul>
            </div>
            {/* right navbar  */}
            <div className="hidden md:flex text-white items-center gap-6">
                    <img className="w-6 h-6 cursor-pointer" src={searchIcon}  alt="logo-search"/>
                    <Link to="/checkout"><img className="w-6 h-6 cursor-pointer" src={cartIcon}  alt="logo-keranjang"/></Link>
                <Link className="w-24 h-10 border flex items-center justify-center rounded" to="/login">SignIn</Link>
                <Link className="w-24 h-10 bg-[#FF8906] flex items-center justify-center rounded" to="/register">Sign Up</Link>
            </div>
            {/* hamburger menu  */}
            <div className="md:hidden flex items-center">
                <button className="text-white text-2xl">
                    &#9776;
                </button>                
            </div>
        </div>
  )
}
