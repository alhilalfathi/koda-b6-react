import { Link } from "react-router-dom"

export const HomeNav = ()=>{
    return(
    
        <div className="w-full h-16 flex justify-between bg-black/10 absolute px-4 md:px-10">
            {/* left navbar  */}
            <div className="flex items-center gap-6">
                <div >
                    <img className="w-auto h-8" src="src/assets/img/Frame13.png" alt="logo-kopi"/>
                </div>
                <ul className="text-white hidden md:flex gap-6">
                    <li><Link to="/">Home</Link></li>
                    <li> <Link to="/product">Product</Link></li>
                </ul>
            </div>
            {/* right navbar  */}
            <div className="hidden md:flex text-white items-center gap-6">
                    <img className="w-6 h-6" src="src/assets/img/Search.png"  alt="logo-search"/>
                    <img className="w-6 h-6" src="src/assets/img/ShoppingCart.png"  alt="logo-keranjang"/>
                <Link className="w-24 h-10 border flex items-center justify-center" to="/login">SignIn</Link>
                <Link className="w-24 h-10 bg-orange-600 flex items-center justify-center" to="/register">Sign Up</Link>
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