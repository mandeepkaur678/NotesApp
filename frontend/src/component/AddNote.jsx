import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import notes from '../data/notes.json' 
import api from "../utils/api";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddNote = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const color = [...new Set(notes.flatMap(note=>note.topcolor))]

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [topcolor, setTopcolor] = useState(color[0]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const addNoteMutation = useMutation({
    mutationFn: async (newNote) => {
      const { data } = await api.post("/notes/", newNote);

      return data;
    },
    onSuccess: (savedNote) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      navigate("/notes");
    },
    onError: (err) => {
      toast.error("Failed to save note!");
      console.log(err);
    },
  });

  const handlesubmit = (e) => {
    e.preventDefault();
    addNoteMutation.mutate({ title, content, tags, topcolor, date });
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
          <div>
            {color.map((icolor) => (
              <button key={icolor} onClick={() => setTopcolor(icolor)} style={{ backgroundColor : icolor}}
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
                disabled={addNoteMutation.isPending}
                className="border mx-1 py-2 px-2 border-green-200 bg-green-400/30 rounded-md hover:font-bold hover:bg-green-700 hover:text-white"
              >
                {addNoteMutation.isPending ? "Saving..." : "Save note"}
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
