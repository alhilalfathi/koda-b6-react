import { Link, Outlet } from "react-router-dom"


export const AdminPage = () => {
  return (
    <div>
        <nav className="flex items-center justify-between px-20 py-5 border border-white border-b-[#E8E8E8]">
            <img src="src/assets/img/Frame12.png" alt="logo coffee shop"/>
            <div class="flex items-center gap-6">
                <img src="src/assets/img/Search-gray.png" alt="search icon"/>
                <img src="src/assets/img/ShoppingCart-grey.png" alt="cart icon"/>
                <div>
                    <img src="src/assets/img/Ellipse185.png" alt="profile pictures" className="w-8 h-8"/>
                </div>
            </div>
        </nav>
        <div className="flex gap-3">
            <aside className="w-1/5 p-10 space-y-5 border border-white min-h-screen border-r-[#E8E8E8]">
                <Link to="/admin" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 font-bold">
                    <img src="src/assets/img/u_create-dashboard.png" alt="dashboard icon"/>
                    Dashboard
                </Link>
                <Link to="/admin/product" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 font-bold">
                    <img src="src/assets/img/u_glass-tea.png" alt="product icon"/>
                    Product
                </Link>
                <Link to="/admin/order" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 font-bold">
                    <img src="src/assets/img/Bag.png" alt="order icon"/>
                    Order
                </Link>
                <Link to="/admin/users" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 font-bold">
                    <img src="src/assets/img/2-User.png" alt="user icon"/>
                    User
                </Link>
                <Link to="" className="flex items-center gap-3 p-3 rounded-lg text-gray-600 font-bold">
                    <img src="src/assets/img/Log-Out.png" alt="logout icon"/>
                    Keluar
                </Link>
            </aside>
            <div className="w-4/5">
                <Outlet />
            </div>
        </div>
    </div>
  )
}
