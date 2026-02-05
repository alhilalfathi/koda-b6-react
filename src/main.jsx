import { createRoot } from "react-dom/client";
import "./assets/css/style.css"
import { Router } from "./Router";
import { DataProvider } from "./component/context/DataContext";




const el = document.getElementById("root")
const root = createRoot(el)



root.render(
    <DataProvider>
        <Router/>
    </DataProvider>
)