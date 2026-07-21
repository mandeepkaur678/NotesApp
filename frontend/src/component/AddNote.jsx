import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import notes from "../data/notes.json";
import { toast } from "sonner";
import { useCreateNoteMutation } from "../service/noteService";

const AddNote = () => {
  const navigate = useNavigate();
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  console.log("cloudName: ", cloudName);

  const color = [...new Set(notes.flatMap((note) => note.topcolor))];
    const tag = [...new Set(notes.flatMap((note) => note.tag))];

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [topcolor, setTopcolor] = useState(color[0]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [imageFile, setImageFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState("");

  const addNoteMutation = useCreateNoteMutation({
    onSuccess: () => navigate("/notes"),
    onError: (err) => {
      toast.error("Failed to save note!");
      console.log(err);
    },
  });

  const uploadImageToCloudinary = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error(
        "Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env.",
      );
    }

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    console.log("cloudName: ", cloudName);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.secure_url) {
      const errorMessage = data.error?.message || "Cloudinary upload failed.";
      throw new Error(errorMessage);
    }

    return data.secure_url;
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !tags) {
      toast.error("please fill all the fields");
      return;
    }
    setImageError("");

    try {
      let imageUrl;

      if (imageFile) {
        setImageUploading(true);
        imageUrl = await uploadImageToCloudinary(imageFile);
      }

      const notePayload = {
        title,
        content,
        tags,
        topcolor,
        date,
      };

      if (imageUrl) {
        notePayload.imageUrl = imageUrl;
      }

      addNoteMutation.mutate(notePayload);
    } catch (error) {
      setImageError(error.message || "Image upload failed.");
      toast.error(error.message || "Image upload failed.");
      console.error(error);
    } finally {
      setImageUploading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-black/60 ">
        <div className=" bg-white rounded-lg shadow-lg w-2/3 p-5 max-w-2xl overflow-hidden">
          <div className="flex justify-between">
            <p className="text-sm text-gray-600 p-3">NEW NOTE</p>

            <button
              type="button"
              onClick={() => navigate("/notes")}
              className="my-auto mr-2 px-2 border-2 border-black rounded-full"
            >
              X
            </button>
          </div>

          <input
            type="text"
            placeholder="Untitled note"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mx-2 text-xl"
          />
          <h1
            key={tags}
            className="px-5 py-2  rounded-full border bg-white transition-all duration-300 group-hover:opacity-40 hover:!opacity-100 hover:bg-green-700 hover:text-white hover:scale-110 cursor-pointer"
          >
            {tags}
          </h1>
          <div>
            {color.map((icolor) => (
              <button
                key={icolor}
                onClick={() => setTopcolor(icolor)}
                style={{ backgroundColor: icolor }}
                className="rounded-full p-4 m-2"
              />
            ))}
          </div>

          <textarea
            type="text"
            cols={40}
            rows={10}
            placeholder="Start writing..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-amber-200 p-4 bg-amber-200/10 w-full"
          ></textarea>

          <input
            type="text"
            placeholder="Add tag"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="rounded-sm my-2 border-none w-full"
          />

          <div className="my-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImageError("");
                setImageFile(e.target.files?.[0] || null);
              }}
              className="w-full"
            />
            {imageFile && (
              <p className="text-xs text-gray-500 mt-1">
                Selected file: {imageFile.name}
              </p>
            )}
            {imageError && (
              <p className="text-xs text-red-500 mt-1">{imageError}</p>
            )}
          </div>

          <div className="border-t-2 w-full my-2"></div>
          <div className="text-right py-2 flex justify-between">
            <h4 className="text-gray-500">{date}</h4>
            <div>
              <button
                type="button"
                onClick={() => navigate("/notes")}
                className="border mx-2 py-2 px-2 border-amber-100 rounded-md hover:bg-amber-50 hover:font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={(e) => handlesubmit(e)}
                disabled={addNoteMutation.isPending || imageUploading}
                className="border mx-1 py-2 px-2 border-green-200 bg-green-400/30 rounded-md hover:font-bold hover:bg-green-700 hover:text-white"
              >
                {addNoteMutation.isPending || imageUploading
                  ? "Saving..."
                  : "Save note"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default AddNote;
