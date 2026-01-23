import { Link } from "react-router-dom"

export const HomeNav = ()=>{
    return(
    
        <div className="w-full h-16 flex justify-between bg-black">
            <div className="flex items-center gap-6 px-8 ml-10">
                <div >
                    <img className="w-auto" src="src/assets/img/Frame13.png" alt="logo-kopi"/>
                </div>
                <ul className="text-white flex gap-6">
                    <li><Link to="/">Home</Link></li>
                    <li> <Link to="/product">Product</Link></li>
                </ul>
            </div>
            <div className="flex gap-6 text-white items-center gap-6 px-8 mr-10">
                    <img className="w-6 h-6" src="src/assets/img/Search.png"  alt="logo-search"/>
                    <img className="w-6 h-6" src="src/assets/img/ShoppingCart.png"  alt="logo-keranjang"/>
                <Link className="w-18 h-8 border flex items-center justify-center" to="/login">SignIn</Link>
                <Link className="w-18 h-8 bg-orange-600 flex items-center justify-center" to="/register">Sign Up</Link>
            </div>
        </div>

    )
}