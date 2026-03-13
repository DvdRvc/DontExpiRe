export default function Register() {
    return (
        <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center px-4">
            <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md md:grid-cols-2">

                <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] p-10 border-r border-white/10">
                    <div>
                        <div className="mb-6 inline-flex items-center gap-3 rounded-2xl border border-[#27AE60]/30 bg-[#27AE60]/10 px-4 py-2">
                            <span className="text-2xl">🥬</span>
                            <span className="text-sm font-semibold tracking-wide text-[#27AE60]">
                                DontExpiRe
                            </span>
                        </div>

                        <h1 className="max-w-sm text-4xl font-bold leading-tight">
                            Create an account and start tracking product expiration dates.
                        </h1>

                        <p className="mt-4 max-w-md text-sm leading-6 text-white/65">
                            Add your groceries, track expiration dates, and receive timely notifications.
                        </p>
                    </div>

                    <div className="mt-10 space-y-4">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-sm text-white/80">✔ Add products</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-sm text-white/80">✔ Track expiration dates</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <p className="text-sm text-white/80">✔ Automatic alerts</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 sm:p-10 md:p-12">
                    <div className="mx-auto w-full max-w-md">
                        <div className="mb-8 md:hidden">
                            <div className="mb-4 inline-flex items-center gap-3 rounded-2xl border border-[#27AE60]/30 bg-[#27AE60]/10 px-4 py-2">
                                <span className="text-2xl">🥬</span>
                                <span className="text-sm font-semibold tracking-wide text-[#27AE60]">
                                    DontExpiRe
                                </span>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold tracking-tight">Register</h2>
                            <p className="mt-2 text-sm text-white/65">
                                Create an account to start using the application.
                            </p>
                        </div>

                        <form className="space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-white/90">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full rounded-2xl border border-white/10 bg-[#1B1B1B] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#27AE60] focus:ring-2 focus:ring-[#27AE60]/20"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-white/90">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    placeholder="enter@email.com"
                                    className="w-full rounded-2xl border border-white/10 bg-[#1B1B1B] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#27AE60] focus:ring-2 focus:ring-[#27AE60]/20"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-white/90">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full rounded-2xl border border-white/10 bg-[#1B1B1B] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#27AE60] focus:ring-2 focus:ring-[#27AE60]/20"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-2xl bg-[#27AE60] px-4 py-3 font-semibold text-white transition hover:brightness-110 active:scale-[0.99]"
                            >
                                Sign up
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-white/60">
                            Already have an account?{" "}
                            <button
                                type="button"
                                className="font-semibold text-[#27AE60] hover:opacity-80"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}