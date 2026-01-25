import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RegisterPage } from "./pages/Register";
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/Home";
import { ForgotPass } from "./pages/ForgotPassword";
import { ChatPage } from "./pages/Chat";
import { ProductPage } from "./pages/ProductPage";


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
    }
])

export function Router(){
    return(
        <RouterProvider router={router}/>
    )
}