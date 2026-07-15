import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const NoteView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  //axios.get(`http://localhost:5000/notes/`)
  //.then((res) => setNotes(res.data))
  //.catch((err) => console.log(err))

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (id === "default") {
        const res = await axios.get(`${apiUrl}/notes`, config);
        if (res.data && res.data.length > 0) {
          setNote(res.data[0]);
        } else {
          setNote({
            title: "Preview Note",
            content: "Select or create a note to view its details here.",
            tags: ["Empty"],
            topcolor: "#475569",
          });
        }
      } else {
        const res = await axios.get(`${apiUrl}/notes/${id}`, config);
        setNote(res.data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load note");

      navigate("/notes");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, [id]);

  if (loading) {
    return <div>Loading....</div>;
  }

  if (!note) {
    return <div>No note found....</div>;
  }

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-40 ">
        <div className="bg-white border-2 p-2 rounded-xl mx-32 ">
          <div>
            <div className="flex justify-between px-4 pt-2">
              <h1 className="font-bold text-lg ">{note.title}</h1>
              <p className=" text-gray-400">{note.date}</p>
            </div>
            <button
              className="border-2 w-fit px-3 rounded-full mx-3 my-2"
              style={{ backgroundColor: note.topcolor }}
            >
              {note.tags}
            </button>
          </div>
          <div className="border-t-2 border-black/50"></div>
          <div className=" font-serif px-3 py-2 ">
            <p className="">{note.content}</p>

            <div className="py-3">
              {(note.tasks || []).map((tag, index) => (
                <p key={index}>{tag}</p>
              ))}
            </div>
          </div>

          <div className="flex justify-between mx-3 border-t-2">
            <button className="text-red-600">Delete Note</button>
            <div className="">
              <button
                onClick={() => navigate("/notes")}
                className="border-2 mx-2 px-2 rounded-lg my-3 hover:bg-green-600 hover:text-white"
              >
                Close
              </button>
              <button className="border-2 px-2 rounded-lg hover:bg-green-600 hover:text-white">
                Edit Note
              </button>
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default NoteView;
