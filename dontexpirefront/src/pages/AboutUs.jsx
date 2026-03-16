import FloatingFood from "../components/FloatingFood";
import logoFull from "../assets/full-logo.svg";

export default function About() {
    return (
        <>

            <div className="relative bg-[#121212] text-white py-16 px-6 overflow-hidden">
                <FloatingFood />
                <div className="relative z-10 max-w-5xl mx-auto space-y-16">

                    {/* ABOUT PROJECT */}
                    <section>
                        <h1 className="text-4xl font-bold mb-4 text-[#27AE60]">
                            About DontExpiRe
                        </h1>

                        <p className="text-white/80 leading-7">
                            DontExpiRe is a web application designed to help users keep track
                            of food expiration dates in a simple and organized way. The goal
                            of the application is to reduce food waste and help people manage
                            their groceries more efficiently.
                        </p>

                        <p className="text-white/80 leading-7 mt-4">
                            Users can store information about their products, monitor
                            expiration dates and receive alerts when a product is about to
                            expire. This makes everyday food management easier and more
                            organized.
                        </p>
                    </section>

                    {/* MISSION */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#27AE60]">
                            Our Mission
                        </h2>

                        <p className="text-white/80 leading-7">
                            The mission of DontExpiRe is to help people waste less food by
                            providing a simple tool for tracking product expiration dates.
                            Many households throw away food simply because they forget when
                            it expires. This application aims to solve that problem by keeping
                            everything in one place.
                        </p>
                    </section>

                    {/* CREATOR */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#27AE60]">
                            About the Creator
                        </h2>

                        <p className="text-white/80 leading-7">
                            This project was created by David Ravić, a computer science
                            graduate and junior developer passionate about building useful
                            software solutions. The project was developed as a portfolio
                            application to demonstrate full-stack development skills using
                            modern web technologies.
                        </p>
                    </section>

                    {/* TECHNOLOGIES */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-[#27AE60]">
                            Technology Stack
                        </h2>

                        <ul className="text-white/80 space-y-2">
                            <li> React + Vite (Frontend)</li>
                            <li> Tailwind CSS (UI Styling)</li>
                            <li> Spring Boot (Backend)</li>
                            <li> MySQL (Database)</li>
                            <li> JWT Authentication</li>
                        </ul>
                    </section>

                </div>

                <div className="flex flex-col items-center mt-12 gap-2 opacity-90">
                    <img src={logoFull} alt="DontExpiRe logo" className="w-128" />

                </div>
            </div>
        </>
    );
}