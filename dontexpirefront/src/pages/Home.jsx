import { useState } from "react";
import FloatingFoods from "../components/FloatingFood.jsx";

export default function HomePage() {
    const [fridgeOpen, setFridgeOpen] = useState(false);
    const [freezerOpen, setFreezerOpen] = useState(false);

    const fridgeItems = [
        "Milk",
        "Eggs",
        "Cheese",
        "Tomatoes",
        "Yogurt",
        "Chicken breast",
    ];

    return (
        <div className="min-h-screen bg-neutral-950 text-white px-6 py-10">
            <FloatingFoods/>
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold tracking-tight">DontExpiRe</h1>
                    <p className="text-neutral-400 mt-3 text-lg">
                        Open your fridge and keep track of your food.
                    </p>
                </div>

                <div className="flex justify-center">
                    <div className="relative w-[340px] sm:w-[400px] h-[720px]">
                        {/* Fridge body */}
                        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-neutral-200 to-neutral-400 shadow-2xl border border-neutral-300 overflow-hidden">
                            {/* Freezer area */}
                            <div className="absolute top-0 left-0 w-full h-[28%] border-b-4 border-neutral-500 bg-neutral-300">
                                {!freezerOpen && (
                                    <button
                                        onClick={() => setFreezerOpen(true)}
                                        className="absolute inset-0 w-full h-full rounded-t-[2.5rem] bg-gradient-to-br from-neutral-200 to-neutral-400 hover:brightness-105 transition"
                                    >
                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 w-3 h-20 rounded-full bg-neutral-700" />
                                        <span className="text-neutral-800 font-semibold text-lg">
                                            Freezer
                                        </span>
                                    </button>
                                )}

                                {freezerOpen && (
                                    <div className="absolute inset-0 flex">
                                        {/* opened door */}
                                        <div className="w-1/3 h-full origin-left -rotate-y-45 bg-gradient-to-br from-neutral-200 to-neutral-400 border-r border-neutral-500 shadow-xl rounded-tl-[2.5rem]">
                                            <button
                                                onClick={() => setFreezerOpen(false)}
                                                className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full bg-neutral-800 text-white"
                                            >
                                                Close
                                            </button>
                                        </div>

                                        {/* freezer inside */}
                                        <div className="w-2/3 h-full bg-sky-100/80 text-neutral-900 p-4 flex flex-col justify-center">
                                            <h2 className="text-lg font-bold mb-3">Add frozen item</h2>

                                            <div className="space-y-3">
                                                <input
                                                    type="text"
                                                    placeholder="Item name"
                                                    className="w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none"
                                                />
                                                <input
                                                    type="date"
                                                    className="w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none"
                                                />
                                                <button
                                                    type="button"
                                                    className="w-full rounded-xl bg-sky-500 text-white py-2 font-medium hover:bg-sky-600 transition"
                                                >
                                                    Save item
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Main fridge area */}
                            <div className="absolute bottom-0 left-0 w-full h-[72%] bg-neutral-200">
                                {!fridgeOpen && (
                                    <button
                                        onClick={() => setFridgeOpen(true)}
                                        className="absolute inset-0 w-full h-full rounded-b-[2.5rem] bg-gradient-to-br from-neutral-100 to-neutral-400 hover:brightness-105 transition"
                                    >
                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 w-3 h-32 rounded-full bg-neutral-700" />
                                        <span className="text-neutral-800 font-semibold text-xl">
                                            Fridge
                                        </span>
                                    </button>
                                )}

                                {fridgeOpen && (
                                    <div className="absolute inset-0 flex">
                                        {/* opened fridge door */}
                                        <div className="w-1/3 h-full origin-left -rotate-y-12 bg-gradient-to-br from-neutral-100 to-neutral-400 border-r border-neutral-500 shadow-2xl rounded-bl-[2.5rem]">
                                            <button
                                                onClick={() => setFridgeOpen(false)}
                                                className="absolute top-4 left-4 text-xs px-3 py-1 rounded-full bg-neutral-800 text-white"
                                            >
                                                Close
                                            </button>
                                        </div>

                                        {/* fridge inside */}
                                        <div className="w-2/3 h-full bg-neutral-100 text-neutral-900 p-5 flex flex-col">
                                            <h2 className="text-xl font-bold mb-4">Items inside</h2>

                                            <div className="flex-1 space-y-4">
                                                {/* shelves */}
                                                <div className="border-b-2 border-neutral-300 pb-3">
                                                    <p className="text-sm text-neutral-500 mb-2">
                                                        Top shelf
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {fridgeItems.slice(0, 2).map((item) => (
                                                            <span
                                                                key={item}
                                                                className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium"
                                                            >
                                                                {item}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="border-b-2 border-neutral-300 pb-3">
                                                    <p className="text-sm text-neutral-500 mb-2">
                                                        Middle shelf
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {fridgeItems.slice(2, 4).map((item) => (
                                                            <span
                                                                key={item}
                                                                className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium"
                                                            >
                                                                {item}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="text-sm text-neutral-500 mb-2">
                                                        Bottom shelf
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {fridgeItems.slice(4).map((item) => (
                                                            <span
                                                                key={item}
                                                                className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-sm font-medium"
                                                            >
                                                                {item}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* divider line */}
                            <div className="absolute top-[28%] left-0 w-full h-1 bg-neutral-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}