import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="w-full bg-[#121212] border-b border-white/10">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4 text-white">

                <Link to="/" className="flex items-center gap-2 font-semibold text-lg text-[#27AE60]">
                    🥬 DontExpiRe
                </Link>

                <div className="flex items-center gap-6 text-sm">
                    <Link to="/" className="hover:text-[#27AE60] transition">
                        Home
                    </Link>

                    <Link to="/about" className="hover:text-[#27AE60] transition">
                        About Us
                    </Link>

                    <Link to="/login" className="hover:text-[#27AE60] transition">
                        Login
                    </Link>
                </div>

            </div>
        </nav>
    );
}