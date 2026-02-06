import { createRoot } from "react-dom/client";
import "./assets/css/style.css"
import { Router } from "./Router";
import { DataProvider } from "./component/context/DataContext";
import { AuthProvider } from "./component/context/AuthContext";




const el = document.getElementById("root")
const root = createRoot(el)



root.render(
    <AuthProvider>
        <DataProvider>
            <Router/>
        </DataProvider>
    </AuthProvider>
)