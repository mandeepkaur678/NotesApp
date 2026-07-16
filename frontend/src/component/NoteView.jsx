import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const NoteView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(null);

  //axios.get(`http://localhost:5000/notes/`)
  //.then((res) => setNotes(res.data))
  //.catch((err) => console.log(err))

  const fetchNotes = async () => {
    try {
      if (id === "default") {
        const res = await api.get("/notes");
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
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        setEditedNote(res.data);
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

  const deleteNoteMutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/notes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted");
      navigate("/notes");
    },
    onError: () => toast.error("Failed to delete note"),
  });

  const updateNoteMutation = useMutation({
    mutationFn: async (updatedNote) => {
      const { data } = await api.put(`/notes/${id}`, updatedNote);
      return data;
    },
    onSuccess: (updatedNote) => {
      setNote(updatedNote);
      setEditedNote(updatedNote);
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note updated");
    },
    onError: () => toast.error("Failed to update note"),
  });

  const saveNote = () => {
    updateNoteMutation.mutate({
      title: editedNote.title,
      content: editedNote.content,
      tags: Array.isArray(editedNote.tags)
        ? editedNote.tags
        : editedNote.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      topcolor: editedNote.topcolor,
    });
  };

  if (loading) {
    return <div>Loading....</div>;
  }

  if (!note) {
    return <div>No note found....</div>;
  }

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-40 ">
        <div className="bg-white border-2 p-2 rounded-xl mx-32 w-96">
          <div>
            <div className="flex justify-between px-4 pt-2">
              <h1 className="font-bold text-lg ">{note.title}</h1>
              <p className=" text-gray-400 ">{note.date}</p>
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
            <button
              onClick={() => deleteNoteMutation.mutate()}
              disabled={id === "default" || deleteNoteMutation.isPending}
              className="text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deleteNoteMutation.isPending ? "Deleting..." : "Delete Note"}
            </button>
            <div className="">
              <button
                onClick={() => navigate("/notes")}
                className="border-2 mx-2 px-2 rounded-lg my-3 hover:bg-green-600 hover:text-white"
              >
                Close
              </button>
              {isEditing ? (
                <button
                  onClick={saveNote}
                  disabled={updateNoteMutation.isPending}
                  className="border-2 px-2 rounded-lg hover:bg-green-600 hover:text-white disabled:opacity-50"
                >
                  {updateNoteMutation.isPending ? "Saving..." : "Save Note"}
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  disabled={id === "default"}
                  className="border-2 px-2 rounded-lg hover:bg-green-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Edit Note
                </button>
              )}
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default NoteView;
