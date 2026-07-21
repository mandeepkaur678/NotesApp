import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { clearTokens, getStoredProfileImage, getStoredUser, setProfileImage } from "../utils/api";

const Profilepage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [user, setUser] = useState(() => getStoredUser());
  const [profileImage, setProfileImageState] = useState(() => getStoredProfileImage());

  useEffect(() => {
    const syncProfile = () => {
      setUser(getStoredUser());
      setProfileImageState(getStoredProfileImage());
    };

    syncProfile();
    window.addEventListener("auth:updated", syncProfile);
    window.addEventListener("auth:logout", syncProfile);

    return () => {
      window.removeEventListener("auth:updated", syncProfile);
      window.removeEventListener("auth:logout", syncProfile);
    };
  }, []);

  const handlelogout = () => {
    clearTokens();
    toast.success("Logout Successfully!");
    navigate("/");
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result;
      setProfileImageState(imageData);
      setProfileImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  const displayName = user?.name || "User";
  const displayEmail = user?.email || "No email";
  const avatarInitial = displayName.trim().charAt(0).toUpperCase() || "U";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black/60 px-4 py-8 text-center">
      <div className="w-full max-w-[360px] rounded-lg border-2 border-white/20 bg-white p-4 text-black shadow-lg shadow-black">
        <h1 className="py-2 text-2xl font-bold">My Profile</h1>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mx-auto mb-3 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-amber-400 bg-amber-100 shadow-sm transition hover:scale-105"
          aria-label="Change profile picture"
        >
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-5xl font-semibold text-amber-700">{avatarInitial}</span>
          )}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        <p className="text-sm text-gray-500">Tap to change your photo</p>

        <div className="mt-4 flex flex-col gap-2 py-4">
          <p className="text-lg">
            <strong>Name:</strong> {displayName}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {displayEmail}
          </p>
        </div>

        <button
          onClick={handlelogout}
          className="w-full bg-amber-400/55 py-2 text-black shadow-sm transition hover:font-bold hover:shadow-amber-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profilepage;
