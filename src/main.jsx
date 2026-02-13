import { createRoot } from "react-dom/client";
import "./assets/css/style.css"
import { Router } from "./Router";
import { DataProvider } from "./component/context/DataContext";
import { Provider } from "react-redux"
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";


const el = document.getElementById("root")
const root = createRoot(el)

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <DataProvider>
                <Router/>
            </DataProvider>
        </PersistGate>
    </Provider>
)