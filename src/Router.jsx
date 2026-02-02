import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RegisterPage } from "./pages/Register";
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/Home";
import { ForgotPass } from "./pages/ForgotPassword";
import { ChatPage } from "./pages/Chat";
import { ProductPage } from "./pages/ProductPage";
import { DetailProduct } from "./pages/DetailProduct";
import { HistoryOrder } from "./pages/HistoryOrder";
import { CheckoutProduct } from "./pages/CheckoutProduct";
import { DetailOrder } from "./pages/DetailOrder";
import { Profile } from "./pages/Profile";
import { AdminPage } from "./pages/AdminPage";
import { Dashboard } from "./pages/Dashboard";
import { AdminProduct } from "./pages/AdminProduct";
import { AdminOrder } from "./pages/AdminOrder";
import { AdminUser } from "./pages/AdminUser";



const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/forgot-password",
        element: <ForgotPass />
    },
    {
        path: "/product",
        element: <ProductPage />
    },
    {
        path: "/chat",
        element: <ChatPage />
    },
    {
        path: "/detail-product/:id",
        element: <DetailProduct />
    },
    {
        path: "/history-order",
        element: <HistoryOrder />
    },
    {
        path: "/checkout",
        element: <CheckoutProduct />
    },
    {
        path: "/detail-order/:orderId",
        element: <DetailOrder />
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/admin",
        element: <AdminPage />,
        children:[
            {
                path: "",
                element: <Dashboard />
            },
            {
                path: "product",
                element: <AdminProduct />
            },
            {
                path: "order",
                element: <AdminOrder />
            },
            {
                path: "users",
                element: <AdminUser />
            }
            
        ]
    }
])

export function Router(){
    return(
        <RouterProvider router={router}/>
    )
}