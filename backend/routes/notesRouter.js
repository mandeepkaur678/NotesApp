import express from "express"
import { deleteNote, getNotes, createNote,changeNote, updateNote, getNotesId } from "../controllers/notesController.js";
import verifyToken from "../middlewares/auth.js";

const router = express.Router()

router.use(verifyToken);

router.get("/", getNotes);

router.get("/:id" , getNotesId)

router.post("/", createNote );

router.delete("/:id", deleteNote); 

router.patch("/:id",changeNote);

router.put("/:id",updateNote);





export default router
