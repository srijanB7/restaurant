import { Routes, Route } from "react-router-dom";
import { RestaurantDetail } from "./pages/RestaurantDetail";
import "./App.css";
import { Home } from "./pages/Home";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            </Routes>
        </>
    );
}

export default App;
