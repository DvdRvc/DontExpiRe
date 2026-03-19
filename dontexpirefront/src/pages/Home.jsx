import { useState,useEffect } from "react";
import FloatingFoods from "../components/FloatingFood.jsx";


export default function HomePage() {
    const [fridgeOpen, setFridgeOpen] = useState(false);
    const [freezerOpen, setFreezerOpen] = useState(false);


    const [products, setProducts] = useState([]);

    const [editModalOpen, setEditModalOpen] = useState(false);

    const [editForm, setEditForm] = useState({
        productId: "",
        productName: "",
        productBrand: "",
        productExpiryDate: "",
        productPrice: "",
        productType: "OTHER",
    });

    const [fridgeForm, setFridgeForm] = useState({
        productName: "",
        productBrand: "",
        productExpiryDate: "",
        productPrice: "",
        productType: "OTHER",
    });

    const [freezerForm, setFreezerForm] = useState({
        productName: "",
        productBrand: "",
        productExpiryDate: "",
        productPrice: "",
        productType: "OTHER",
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const getDaysUntilExpiry = (expiryDate) => {
        const expiry = new Date(expiryDate);
        expiry.setHours(0, 0, 0, 0);

        const diffMs = expiry - today;
        return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    };

    const getExpiryBadgeClasses = (expiryDate) => {
        const daysLeft = getDaysUntilExpiry(expiryDate);

        if (daysLeft < 0) return "bg-red-100 text-red-700";
        if (daysLeft <= 3) return "bg-yellow-100 text-yellow-700";
        return "bg-emerald-100 text-emerald-700";
    };

    const getExpiryLabel = (expiryDate) => {
        const daysLeft = getDaysUntilExpiry(expiryDate);

        if (daysLeft < 0) return "Expired";
        if (daysLeft === 0) return "Expires today";
        if (daysLeft <= 3) return `Expires in ${daysLeft} day${daysLeft > 1 ? "s" : ""}`;
        return "Fresh";
    };

    const handleFridgeInputChange = (e) => {
        const { name, value } = e.target;
        setFridgeForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFreezerInputChange = (e) => {
        const { name, value } = e.target;
        setFreezerForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:8080/product-controller/products");

            if (!response.ok) {
                const errorText = await response.text();
                console.log("Fetch error:", errorText);
                return;
            }

            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.log("Network error:", error);
        }
    };

    const handleAddFridgeProduct = async () => {
        if (!fridgeForm.productName || !fridgeForm.productExpiryDate) return;

        const response = await fetch("http://localhost:8080/product-controller/add-product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productName: fridgeForm.productName,
                productBrand: fridgeForm.productBrand,
                productExpiryDate: fridgeForm.productExpiryDate,
                productPrice: Number(fridgeForm.productPrice),
                productType: fridgeForm.productType,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.log("Add product error:", errorText);
            return;
        }

        console.log("Product added successfully");

        setFridgeForm({
            productName: "",
            productBrand: "",
            productExpiryDate: "",
            productPrice: "",
            productType: "OTHER",
        });

        await fetchProducts();

    };

    const handleAddFreezerProduct = async () => {
        if (!freezerForm.productName || !freezerForm.productExpiryDate) return;

        const response = await fetch("http://localhost:8080/product-controller/add-product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productName: freezerForm.productName,
                productBrand: freezerForm.productBrand,
                productExpiryDate: freezerForm.productExpiryDate,
                productPrice: Number(freezerForm.productPrice),
                productType: freezerForm.productType,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.log("Add freezer product error:", errorText);
            return;
        }

        console.log("Freezer product added successfully");


        setFreezerForm({
            productName: "",
            productBrand: "",
            productExpiryDate: "",
            productPrice: "",
            productType: "OTHER",
        });

        await fetchProducts();
    };

    const handleDeleteFridgeProduct = async (productId) => {
        try {
            const response = await fetch("http://localhost:8080/product-controller/remove-product", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId: productId,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.log("Delete product error:", errorText);
                return;
            }

            console.log("Product deleted successfully");
            await fetchProducts();
        } catch (error) {
            console.log("Network error:", error);
        }
    };

    const handleUpdateProduct = async () => {
        try {

            const payload = {
                productId: editForm.productId,
                productName: editForm.productName,
                productBrand: editForm.productBrand,
                productExpiryDate: editForm.productExpiryDate,
                productPrice: Number(editForm.productPrice),
                productType: editForm.productType,
            };

            console.log("UPDATE PAYLOAD:", payload);

            const response = await fetch(`http://localhost:8080/product-controller/update/${editForm.productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const text = await response.text();
            console.log("UPDATE STATUS:", response.status);
            console.log("UPDATE RESPONSE:", text);

            if (!response.ok) {
                return;
            }

            setEditModalOpen(false);
            await fetchProducts();
        } catch (error) {
            console.log("Network error:", error);
        }
    };

    const handleOpenEditModal = (product) => {
        setEditForm({
            productId: product.productId,
            productName: product.productName,
            productBrand: product.productBrand,
            productExpiryDate: product.productExpiryDate,
            productPrice: product.productPrice,
            productType: product.productType,
        });

        setEditModalOpen(true);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;

        setEditForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        fetchProducts();
    }, []);



    {/* Shelf levels*/}

    const topShelf = products.slice(0, 2);
    const middleShelf = products.slice(2, 4);
    const bottomShelf = products.slice(4);


    {/* OBJ to JSX for item cards (transforamtion)*/}
    const renderProductCard = (product, onDelete) => (
        <div
            key={product.productId}
            className="rounded-xl border border-neutral-200 bg-white p-3 shadow-sm"
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="font-semibold text-neutral-900">{product.productName}</p>
                    <p className="text-sm text-neutral-500">
                        {product.productBrand || "No brand"}
                    </p>
                </div>

                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getExpiryBadgeClasses(
                        product.productExpiryDate
                    )}`}
                >
                    {getExpiryLabel(product.productExpiryDate)}
                </span>
            </div>

            <div className="mt-3 space-y-1 text-sm text-neutral-600">
                <p>Type: {product.productType}</p>
                <p>Expiry: {product.productExpiryDate}</p>
                <p>
                    Price: {product.productPrice ? `${product.productPrice.toFixed(2)} €` : "—"}
                </p>
            </div>

            <button
                type="button"
                onClick={() => onDelete(product.productId)}
                className="mt-3 w-full rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-600"
            >
                Remove
            </button>

            <div className="mt-3 flex gap-2">
                <button
                    type="button"
                    onClick={() => handleOpenEditModal(product)}
                    className="w-full rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
                >
                    Edit
                </button>

            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-neutral-950 text-white px-6 py-10">
            <FloatingFoods />
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold tracking-tight">DontExpiRe</h1>
                    <p className="text-neutral-400 mt-3 text-lg">
                        Open your fridge and keep track of your food.
                    </p>
                </div>

                <div className="flex justify-center">
                    <div className="relative w-[420px] sm:w-[500px] h-[820px]">
                        <div className="absolute inset-0 rounded-[2.8rem] bg-gradient-to-b from-neutral-200 to-neutral-400 shadow-2xl border border-neutral-300 overflow-hidden">

                            <div className="absolute top-0 left-0 w-full h-[28%] border-b-4 border-neutral-500 bg-neutral-300">
                                {!freezerOpen && (
                                    <button
                                        onClick={() => setFreezerOpen(true)}
                                        className="absolute inset-0 w-full h-full rounded-t-[2.8rem] bg-gradient-to-br from-neutral-200 to-neutral-400 hover:brightness-105 transition"
                                    >
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-3 h-24 rounded-full bg-neutral-700" />
                                        <span className="text-neutral-800 font-semibold text-xl">
                                            Freezer
                                        </span>
                                    </button>
                                )}

                                {freezerOpen && (
                                    <div className="absolute inset-0 flex">
                                        <div className="w-1/3 h-full origin-left -rotate-y-45 bg-gradient-to-br from-neutral-200 to-neutral-400 border-r border-neutral-500 shadow-xl rounded-tl-[2.8rem]">
                                            <button
                                                onClick={() => setFreezerOpen(false)}
                                                className="absolute top-3 left-3 text-xs px-3 py-1 rounded-full bg-neutral-800 text-white"
                                            >
                                                Close
                                            </button>
                                        </div>

                                        <div className="w-2/3 h-full bg-sky-100/80 text-neutral-900 p-4 overflow-y-auto">
                                            <h2 className="text-lg font-bold mb-3">Add frozen item</h2>

                                            <div className="space-y-2 mb-4">
                                                <input
                                                    type="text"
                                                    name="productName"
                                                    value={freezerForm.productName}
                                                    onChange={handleFreezerInputChange}
                                                    placeholder="Item name"
                                                    className="w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    name="productBrand"
                                                    value={freezerForm.productBrand}
                                                    onChange={handleFreezerInputChange}
                                                    placeholder="Brand"
                                                    className="w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none"
                                                />
                                                <input
                                                    type="date"
                                                    name="productExpiryDate"
                                                    value={freezerForm.productExpiryDate}
                                                    onChange={handleFreezerInputChange}
                                                    className="w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none"
                                                />
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    name="productPrice"
                                                    value={freezerForm.productPrice}
                                                    onChange={handleFreezerInputChange}
                                                    placeholder="Price"
                                                    className="w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none"
                                                />
                                                <select
                                                    name="productType"
                                                    value={freezerForm.productType}
                                                    onChange={handleFreezerInputChange}
                                                    className="w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none"
                                                >
                                                    <option value="OTHER">Other</option>
                                                    <option value="Fruit">Fruit</option>
                                                    <option value="Vegetables">Vegetables</option>
                                                    <option value="Meat_and_fish">Meat and Fish</option>
                                                    <option value="Milk_and_dairy_products">Milk and diary products</option>
                                                    <option value="Drinks">Drinks</option>
                                                    <option value="Sweets_and_sugar">Sweets and sugar</option>

                                                </select>

                                                <button
                                                    type="button"
                                                    onClick={handleAddFreezerProduct}
                                                    className="w-full rounded-xl bg-sky-500 text-white py-2 font-medium hover:bg-sky-600 transition"
                                                >
                                                    Save item
                                                </button>
                                            </div>

                                            <div className="space-y-2">
                                                {products.length === 0 ? (
                                                    <p className="text-sm text-neutral-500">
                                                        No frozen items yet.
                                                    </p>
                                                ) : (
                                                    products.map((product) =>
                                                        renderProductCard(
                                                            product,
                                                            handleDeleteFridgeProduct
                                                        )
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>


                            <div className="absolute bottom-0 left-0 w-full h-[72%] bg-neutral-200">
                                {!fridgeOpen && (
                                    <button
                                        onClick={() => setFridgeOpen(true)}
                                        className="absolute inset-0 w-full h-full rounded-b-[2.8rem] bg-gradient-to-br from-neutral-100 to-neutral-400 hover:brightness-105 transition"
                                    >
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-3 h-36 rounded-full bg-neutral-700" />
                                        <span className="text-neutral-800 font-semibold text-2xl">
                                            Fridge
                                        </span>
                                    </button>
                                )}

                                {fridgeOpen && (
                                    <div className="absolute inset-0 flex">
                                        <div className="w-1/3 h-full origin-left -rotate-y-12 bg-gradient-to-br from-neutral-100 to-neutral-400 border-r border-neutral-500 shadow-2xl rounded-bl-[2.8rem]">
                                            <button
                                                onClick={() => setFridgeOpen(false)}
                                                className="absolute top-4 left-4 text-xs px-3 py-1 rounded-full bg-neutral-800 text-white"
                                            >
                                                Close
                                            </button>
                                        </div>

                                        <div className="w-2/3 h-full bg-neutral-100 text-neutral-900 p-5 flex flex-col overflow-y-auto">
                                            <h2 className="text-xl font-bold mb-4">Items inside</h2>

                                            <div className="space-y-2 mb-5">
                                                <input
                                                    type="text"
                                                    name="productName"
                                                    value={fridgeForm.productName}
                                                    onChange={handleFridgeInputChange}
                                                    placeholder="Item name"
                                                    className="w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    name="productBrand"
                                                    value={fridgeForm.productBrand}
                                                    onChange={handleFridgeInputChange}
                                                    placeholder="Brand"
                                                    className="w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none"
                                                />
                                                <input
                                                    type="date"
                                                    name="productExpiryDate"
                                                    value={fridgeForm.productExpiryDate}
                                                    onChange={handleFridgeInputChange}
                                                    className="w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none"
                                                />
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    name="productPrice"
                                                    value={fridgeForm.productPrice}
                                                    onChange={handleFridgeInputChange}
                                                    placeholder="Price"
                                                    className="w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none"
                                                />
                                                <select
                                                    name="productType"
                                                    value={fridgeForm.productType}
                                                    onChange={handleFridgeInputChange}
                                                    className="w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none"
                                                >
                                                    <option value="OTHER">Other</option>
                                                    <option value="Fruit">Fruit</option>
                                                    <option value="Vegetables">Vegetables</option>
                                                    <option value="Meat_and_fish">Meat and Fish</option>
                                                    <option value="Milk_and_dairy_products">Milk and diary products</option>
                                                    <option value="Drinks">Drinks</option>
                                                    <option value="Sweets_and_sugar">Sweets and sugar</option>
                                                </select>

                                                <button
                                                    type="button"
                                                    onClick={handleAddFridgeProduct}
                                                    className="w-full rounded-xl bg-emerald-500 text-white py-2 font-medium hover:bg-emerald-600 transition"
                                                >
                                                    Save item
                                                </button>
                                            </div>

                                            <div className="flex-1 space-y-4">
                                                <div className="border-b-2 border-neutral-300 pb-3">
                                                    <p className="text-sm text-neutral-500 mb-2">
                                                        Top shelf
                                                    </p>
                                                    <div className="space-y-2">
                                                        {topShelf.length === 0 ? (
                                                            <p className="text-sm text-neutral-400">
                                                                No items here.
                                                            </p>
                                                        ) : (
                                                            topShelf.map((product) =>
                                                                renderProductCard(
                                                                    product,
                                                                    handleDeleteFridgeProduct
                                                                )
                                                            )
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="border-b-2 border-neutral-300 pb-3">
                                                    <p className="text-sm text-neutral-500 mb-2">
                                                        Middle shelf
                                                    </p>
                                                    <div className="space-y-2">
                                                        {middleShelf.length === 0 ? (
                                                            <p className="text-sm text-neutral-400">
                                                                No items here.
                                                            </p>
                                                        ) : (
                                                            middleShelf.map((product) =>
                                                                renderProductCard(
                                                                    product,
                                                                    handleDeleteFridgeProduct
                                                                )
                                                            )
                                                        )}
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="text-sm text-neutral-500 mb-2">
                                                        Bottom shelf
                                                    </p>
                                                    <div className="space-y-2">
                                                        {bottomShelf.length === 0 ? (
                                                            <p className="text-sm text-neutral-400">
                                                                No items here.
                                                            </p>
                                                        ) : (
                                                            bottomShelf.map((product) =>
                                                                renderProductCard(
                                                                    product,
                                                                    handleDeleteFridgeProduct
                                                                )
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>



                            <div className="absolute top-[28%] left-0 w-full h-1 bg-neutral-500" />



                        </div>

                    </div>

                </div>

            </div>

            {editModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 text-neutral-900 shadow-2xl">
                        <h2 className="text-xl font-bold mb-4">Edit product</h2>

                        <div className="space-y-3">
                            <input
                                type="text"
                                name="productName"
                                value={editForm.productName}
                                onChange={handleEditInputChange}
                                placeholder="Item name"
                                className="w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none"
                            />

                            <input
                                type="text"
                                name="productBrand"
                                value={editForm.productBrand}
                                onChange={handleEditInputChange}
                                placeholder="Brand"
                                className="w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none"
                            />

                            <input
                                type="date"
                                name="productExpiryDate"
                                value={editForm.productExpiryDate}
                                onChange={handleEditInputChange}
                                className="w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none"
                            />

                            <input
                                type="number"
                                step="0.01"
                                name="productPrice"
                                value={editForm.productPrice}
                                onChange={handleEditInputChange}
                                placeholder="Price"
                                className="w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none"
                            />

                            <select
                                name="productType"
                                value={editForm.productType}
                                onChange={handleEditInputChange}
                                className="w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none"
                            >
                                <option value="OTHER">Other</option>
                                <option value="Fruit">Fruit</option>
                                <option value="Vegetables">Vegetables</option>
                                <option value="Meat_and_fish">Meat and Fish</option>
                                <option value="Milk_and_dairy_products">Milk and dairy products</option>
                                <option value="Drinks">Drinks</option>
                                <option value="Sweets_and_sugar">Sweets and sugar</option>
                            </select>
                        </div>

                        <div className="mt-5 flex gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    console.log("SAVE CLICKED");
                                    handleUpdateProduct();
                                }}
                                className="w-full rounded-xl bg-blue-500 py-2 font-medium text-white transition hover:bg-blue-600"
                            >
                                Save changes
                            </button>

                            <button
                                type="button"
                                onClick={() => setEditModalOpen(false)}
                                className="w-full rounded-xl bg-neutral-300 py-2 font-medium text-neutral-800 transition hover:bg-neutral-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>



    );
}