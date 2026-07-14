import { split } from "postcss/lib/list";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import notes from "../data/notes.json";
import axios from "axios";
import { toast } from "sonner";

const AddNote = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [topcolor, setTopcolor] = useState("#ffffff");

  const colors = [...new Set(notes.flatMap((note) => note.topcolor))];

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/notes/addnote", {
        title,
        content,
        tags,
        topcolor,
      });

      navigate("/notes");
    } catch (err) {
      toast.error("Failed to save note!");
      console.log(err);
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
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <input
            type="color"
            value={topcolor}
            onChange={(e) => setTopcolor(e.target.value)}
          />

          <textarea
            type="text"
            cols={40}
            rows={10}
            placeholder="Start writing..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-amber-200 p-4 bg-amber-200/10 w-full"
          ></textarea>

          <div className="border-t-2 w-full my-2"></div>
          <div className="text-right py-2">
            <button
              type="button"
              onClick={() => navigate("/notes")}
              className="border mx-2 py-2 px-2 border-amber-100 rounded-md hover:bg-amber-50 hover:font-bold"
            >
              Cancel
            </button>
            <button
              onClick={(e) => handlesubmit(e)}
              className="border mx-1 py-2 px-2 border-green-200 bg-green-400/30 rounded-md hover:font-bold hover:bg-green-700 hover:text-white"
            >
              Save note
            </button>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default AddNote;
