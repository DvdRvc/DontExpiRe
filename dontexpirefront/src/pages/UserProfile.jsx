import { useState } from "react";
import FloatingFood from "../components/FloatingFood.jsx";
import logoFull from "../assets/full-logo.svg";

export default function UserProfilePage() {
    const [profileData, setProfileData] = useState({
        username: "",
        gender: "",
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setProfileImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:8080/user-controller/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userName: profileData.username,
                    userGender: profileData.gender || null,
                }),
            });

            const text = await response.text();

            if (!response.ok) {
                throw new Error(text || "Failed to update profile.");
            }

            setMessage("Profile updated successfully.");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:8080/user-controller/change-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword,
                }),
            });

            const text = await response.text();

            if (!response.ok) {
                throw new Error(text || "Failed to change password.");
            }

            setMessage("Password changed successfully.");
            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUploadImage = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!profileImage) {
            setError("Please select an image first.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("image", profileImage);

            const response = await fetch("http://localhost:8080/user-controller/profile-image", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const text = await response.text();

            if (!response.ok) {
                throw new Error(text || "Failed to upload image.");
            }

            setMessage("Profile image uploaded successfully.");
        } catch (err) {
            setError(err.message);
        }
    };

    return (


        <div className="min-h-screen bg-neutral-950 text-white px-6 py-10">
            <FloatingFood />
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">User Profile</h1>

                {(message || error) && (
                    <div
                        className={`mb-6 rounded-xl p-4 border ${
                            error
                                ? "bg-red-500/10 border-red-500 text-red-300"
                                : "bg-green-500/10 border-green-500 text-green-300"
                        }`}
                    >
                        {error || message}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <form
                        onSubmit={handleSaveProfile}
                        className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg"
                    >
                        <h2 className="text-xl font-semibold mb-5">Basic Information</h2>

                        <div className="mb-4">
                            <label className="block mb-2 text-sm text-neutral-300">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={profileData.username}
                                onChange={handleProfileChange}
                                placeholder="Enter new username"
                                className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 outline-none focus:border-emerald-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block mb-2 text-sm text-neutral-300">Gender</label>
                            <select
                                name="gender"
                                value={profileData.gender}
                                onChange={handleProfileChange}
                                className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 outline-none focus:border-emerald-500"
                            >
                                <option value="">Select gender</option>
                                <option value="MALE">MALE</option>
                                <option value="FEMALE">FEMALE</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-500 transition rounded-xl py-3 font-medium"
                        >
                            Save Profile
                        </button>
                    </form>

                    {/* Profile Image */}
                    <form
                        onSubmit={handleUploadImage}
                        className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg"
                    >
                        <h2 className="text-xl font-semibold mb-5">Profile Image</h2>

                        <div className="flex flex-col items-center mb-5">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-neutral-700 bg-neutral-800 flex items-center justify-center mb-4">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Profile preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-neutral-400 text-sm">No image</span>
                                )}
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="text-sm text-neutral-300 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-600 file:px-4 file:py-2 file:text-white hover:file:bg-emerald-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-500 transition rounded-xl py-3 font-medium"
                        >
                            Upload Image
                        </button>
                    </form>

                    {/* Password */}
                    <form
                        onSubmit={handleChangePassword}
                        className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg lg:col-span-2"
                    >
                        <h2 className="text-xl font-semibold mb-5">Change Password</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div>
                                <label className="block mb-2 text-sm text-neutral-300">Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 outline-none focus:border-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-neutral-300">New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 outline-none focus:border-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-neutral-300">Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    className="w-full rounded-xl bg-neutral-800 border border-neutral-700 px-4 py-3 outline-none focus:border-emerald-500"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 transition rounded-xl px-6 py-3 font-medium"
                        >
                            Change Password
                        </button>
                    </form>
                </div>
                <div className="flex flex-col items-center mt-12 gap-2 opacity-90">
                    <img src={logoFull} alt="DontExpiRe logo" className="w-128" />

                </div>
            </div>
        </div>
    );
}