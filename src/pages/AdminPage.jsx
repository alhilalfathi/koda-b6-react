import { Link, Outlet, useNavigate } from "react-router-dom"
import coffeeShopLogo from "/assets/img/Frame12.png"
import profilPictures from "/assets/img/Ellipse185.png"
import searchIcon from "/assets/img/Search-gray.png"
import cartIcon from "/assets/img/ShoppingCart-grey.png"
import dashboardIcon from "/assets/img/u_create-dashboard.png"
import productIcon from "/assets/img/u_glass-tea.png"
import orderIcon from "/assets/img/Bag.png"
import userIcon from "/assets/img/2-User.png"
import logOutIcon from "/assets/img/Log-Out.png"
import { useDispatch } from "react-redux"
import { logout } from "../redux/reducers/authReducer"


export const AdminPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutUser = () => {
        dispatch(logout())
        alert("You have logged out")
        navigate("/")
    }
  return (
    <div>
        <nav className="flex items-center justify-between px-20 py-5 border border-white border-b-[#E8E8E8]">
            <img src={coffeeShopLogo} alt="logo coffee shop"/>
            <div className="flex items-center gap-6">
                <img src={searchIcon} alt="search icon"/>
                <img src={cartIcon} alt="cart icon"/>
                <div>
                    <img src={profilPictures} alt="profile pictures" className="w-8 h-8"/>
                </div>
            </div>
        </nav>
        <div className="flex gap-5">
            <aside className="w-1/5 p-10 space-y-5 border border-white min-h-screen border-r-[#E8E8E8]">
                <Link to="/admin" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 font-bold">
                    <img src={dashboardIcon} alt="dashboard icon"/>
                    Dashboard
                </Link>
                <Link to="/admin/product" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 font-bold">
                    <img src={productIcon} alt="product icon"/>
                    Product
                </Link>
                <Link to="/admin/order" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 font-bold">
                    <img src={orderIcon} alt="order icon"/>
                    Order
                </Link>
                <Link to="/admin/users" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 font-bold">
                    <img src={userIcon} alt="user icon"/>
                    User
                </Link>
                <button onClick={logoutUser} className="flex items-center gap-3 p-3 rounded-lg text-gray-600 font-bold cursor-pointer">
                    <img src={logOutIcon} alt="logout icon"/>
                    Keluar
                </button>
            </aside>
            <div className="w-4/5">
                <Outlet />
            </div>
        </div>
    </div>
  )
}
