import { createRoot } from "react-dom/client";
import "./assets/css/style.css"
import { RegisterPage } from "./pages/Register";



const el = document.getElementById("root")
const root = createRoot(el)



root.render(<RegisterPage />)