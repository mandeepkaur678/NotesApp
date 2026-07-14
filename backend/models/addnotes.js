import mongoose from "mongoose";

const addnoteschema = new mongoose.Schema({
    title:String,
    content:String,
    tags:{type:[String]},
    topcolor:String,
    date:Date,
})

const AddNote=mongoose.model("AddNote",addnoteschema);

export default AddNote 