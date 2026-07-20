import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title: String,
    content: String,
    tags:{type:[String]},
    topcolor:String,
    date:Date,
    imageUrl: String,
    completed: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Note = mongoose.model("Note", noteSchema);

export default Note
