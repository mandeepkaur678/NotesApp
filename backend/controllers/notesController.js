import Note from "../models/notes.js";
import AddNote from "../models/addnotes.js";

const deleteNote = async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.json({ message: "Deleted successfully" });
}

const getNotes =  async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
}

const getNotesId = async (req , res) => {
  const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.status(200).json(note)
}

const createNote = async (req, res) => {
    const noteData = { ...req.body };
    delete noteData.user;
    const note = new Note({ ...noteData, user: req.user._id });
    await note.save();
    res.status(201).json(note);
}

const changeNote = async (req, res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { content: "this is the third note" },
    { new: true },
  );

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
};

const updateNote = async (req, res) => {
  const noteData = { ...req.body };
  delete noteData.user;
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    noteData,
    { new: true },
  );

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
}

export {deleteNote, getNotes, createNote,changeNote,updateNote , getNotesId}
