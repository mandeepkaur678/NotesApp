import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title: String,
    content: String,
    tags:{type:[String]},
    topcolor:String,
    date:Date,
    completed: Boolean
});

const Note = mongoose.model("Note", noteSchema);

export default Note
