import Note from "../models/notes.js";
import AddNote from "../models/addnotes.js";

const deleteNote = async (req, res) => {
  const notes = await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
}

const getNotes =  async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
}

const getNotesId = async (req , res) => {
  const notes = await Note.findById(req.params.id)
  res.status(200).json(note)
}

const createNote = async (req, res) => {
    const note=new Note(req.body);
    await note.save();
    res.status(201);
    res.json(note);
}

const changeNote = async (req, res) => {
  const notes = await Note.findByIdAndUpdate(req.params.id,{content: "this is the third note", });
  console.log(notes);
  res.json(notes);
};

const updateNote = async (req, res) => {
  const notes = await Note.findByIdAndUpdate(req.params.id, req.body,{returnDocument: true},)
  res.json(notes);
}




export {deleteNote, getNotes, createNote,changeNote,updateNote , getNotesId}