import express from "express"
import { deleteNote, getNotes, createNote,changeNote, updateNote, getNotesId } from "../controllers/notesController.js";

const router = express.Router()

router.get("/", getNotes);

router.get("/:id" , getNotesId)

router.post("/addnote", createNote );

router.delete("/:id", deleteNote);

router.patch("/:id",changeNote);

router.put("/:id",updateNote);





export default router