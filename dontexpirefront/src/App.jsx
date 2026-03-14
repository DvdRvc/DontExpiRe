import './index.css'
import Navbar from "./components/Navbar";
import Register from "./pages/Register.jsx";
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login.jsx";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";

export default function App() {
    return (
        <div className="min-h-screen bg-[#121212]">
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}