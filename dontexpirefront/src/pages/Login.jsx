import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import FloatingFood from "../components/FloatingFood";
import logo from "../assets/logo-icon.svg";



export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/user-controller/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userEMail: email,
                    userPassword: password,
                }),
            });

            const text = await response.text();
            console.log("Response from backend:", text);



            if (response.ok) {
                localStorage.setItem("token",text) //JWT TOKEN
                navigate("/");// Navigation to page

                setError("");
                console.log("Login successful:", text);
            } else {
                setError("Login failed: E-mail or password is wrong!");
            }
        } catch (error) {
            console.error("Connection error:", error);
            setError("Cannot connect to server");
        }
    };


    return (
        <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center px-4">

            <FloatingFood />

            <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md md:grid-cols-2">
                <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-10 border-r border-white/10">
                    <div>
                        <div className="mb-6 inline-flex items-center gap-3 rounded-2xl border border-[#27AE60]/30 bg-[#27AE60]/10 px-4 py-2">
                            <img
                                src={logo}
                                alt="DontExpiRe logo"
                                className="w-8 h-8"
                            />
                            <span className="text-sm font-semibold tracking-wide text-[#27AE60]">DontExpiRe</span>
                        </div>
                        <h1 className="max-w-sm text-4xl font-bold leading-tight">
                            Track food expiration dates in a simple way.
                        </h1>
                        <p className="mt-4 max-w-md text-sm leading-6 text-white/65">
                            Organize your products, get notified when expiration is approaching, and keep everything in one place.
                        </p>
                    </div>

                    <div className="mt-10 space-y-4">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-sm text-white/80">✔ Overview of all products</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-sm text-white/80">✔ Alerts for products expiring soon</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-sm text-white/80">✔ Modern management dashboard</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 sm:p-10 md:p-12">
                    <div className="mx-auto w-full max-w-md">
                        <div className="mb-8 md:hidden">
                            <div className="mb-4 inline-flex items-center gap-3 rounded-2xl border border-[#27AE60]/30 bg-[#27AE60]/10 px-4 py-2">
                                <img
                                    src={logo}
                                    alt="DontExpiRe logo"
                                    className="w-8 h-8"
                                />
                                <span className="text-sm font-semibold tracking-wide text-[#27AE60]">DontExpiRe</span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold tracking-tight">Login</h2>
                            <p className="mt-2 text-sm text-white/65">
                                Enter your details to access your account.
                            </p>
                        </div>

                        <form className="space-y-5" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/90">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="enter@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-2xl border border-white/10 bg-[#1B1B1B] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#27AE60] focus:ring-2 focus:ring-[#27AE60]/20"
                                />
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium text-white/90">
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        className="text-sm font-medium text-[#27AE60] transition hover:opacity-80"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-2xl border border-white/10 bg-[#1B1B1B] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#27AE60] focus:ring-2 focus:ring-[#27AE60]/20"
                                />
                            </div>
                            {/*
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-white/70">
                                    <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-[#1B1B1B]" />
                                    Remember me
                                </label>
                            </div>
                             */}


                            <button
                                type="submit"
                                className="w-full rounded-2xl bg-[#27AE60] px-4 py-3 font-semibold text-white transition hover:brightness-110 active:scale-[0.99]"
                            >
                                Sign in
                            </button>
                        </form>

                        {error && (
                            <div className="mt-6 rounded-2xl border border-[#E74C3C]/30 bg-[#E74C3C]/10 px-4 py-3 text-sm text-white/85">
                                {error}
                            </div>
                        )}


                        <div className="my-6 flex items-center gap-4">
                            <div className="h-px flex-1 bg-white/10" />
                            <span className="text-xs uppercase tracking-[0.2em] text-white/35">or</span>
                            <div className="h-px flex-1 bg-white/10" />
                        </div>

                        <button
                            type="button"
                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                        >
                            Continue as guest
                        </button>

                        <p className="mt-8 text-center text-sm text-white/60">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="font-semibold text-[#27AE60] hover:opacity-80"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}