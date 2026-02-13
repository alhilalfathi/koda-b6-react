// import { useContext } from "react"
import { Link } from "react-router-dom"
// import { AuthContext } from "./context/AuthContext"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { logout } from "../redux/reducers/authReducer"

export const HomeNav = () => {
    // const { user, logout } = useContext(AuthContext)
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()


    return (

        <div className="w-full h-16 flex justify-between bg-black/10 absolute px-10 md:px-20">
            {/* left navbar  */}
            <div className="flex items-center gap-6">
                <div >
                    <img className="w-auto h-8" src="/assets/img/Frame13.png" alt="logo-kopi" />
                </div>
                <ul className="text-white hidden md:flex gap-6">
                    <li><Link to="/" className="underline underline-offset-8 decoration-[#FF8906]">Home</Link></li>
                    <li> <Link to="/product">Product</Link></li>
                </ul>
            </div>
            {/* right navbar  */}
            <div className="hidden md:flex text-white items-center gap-6">
                <img className="w-6 h-6 cursor-pointer" src="/assets/img/Search.png" alt="logo-search" />
                {user && (<Link to="/checkout"><img className="w-6 h-6 cursor-pointer" src="/assets/img/ShoppingCart.png" alt="logo-keranjang" /></Link>)}
                {!user ? (
                    <>
                        <Link className="w-24 h-10 border flex items-center justify-center rounded" to="/login">SignIn</Link>
                        <Link className="w-24 h-10 bg-[#FF8906] flex items-center justify-center rounded" to="/register">Sign Up</Link>
                    </>) : (
                    <>
                        <span className="text-sm">Hi, {user.name}</span>
                        <button
                            onClick={()=>dispatch(logout())}
                            className="w-24 h-10 border flex items-center justify-center rounded cursor-pointer"
                        >
                            Logout
                        </button>
                    </>
                )}
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